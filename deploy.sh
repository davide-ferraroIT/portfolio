#!/usr/bin/env bash
# ==============================================================================
# Script di deploy zero-usura eMMC per Portfolio (davide-ferraro.it)
# Eseguito dalla workstation Fedora -> Server Debian 12
# ==============================================================================
set -euo pipefail

# Parametri server di destinazione (configurabili tramite variabili d'ambiente)
SERVER_USER="${SERVER_USER:?Variabile SERVER_USER non impostata}"
SERVER_HOST="${SERVER_HOST:?Variabile SERVER_HOST non impostata}"
REMOTE_STATIC_DIR="${REMOTE_STATIC_DIR:-/var/www/portfolio}"
REMOTE_BACKEND_DIR="${REMOTE_BACKEND_DIR:-/opt/portfolio-backend}"

# Determina la directory del repository (seguendo anche eventuali symlink)
SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")" && pwd)"
cd "$SCRIPT_DIR"

# Rileva se usare docker o podman su Fedora
if command -v docker >/dev/null 2>&1; then
    CONTAINER_CLI="docker"
    IMAGE_REF="portfolio-backend:latest"
elif command -v podman >/dev/null 2>&1; then
    CONTAINER_CLI="podman"
    # Podman salva i tag con il prefisso localhost/, incompatibile con il nome
    # usato da docker-compose sul server: usiamo il nome canonico completo.
    IMAGE_REF="docker.io/library/portfolio-backend:latest"
else
    echo "Errore: ne Docker ne Podman sono installati su questa macchina." >&2
    exit 1
fi

LOCAL_ARCHIVE="/tmp/portfolio-backend.tar.gz"
cleanup() {
    rm -f "$LOCAL_ARCHIVE"
}
trap cleanup EXIT

echo "=========================================================="
echo "Avvio deploy portfolio su ${SERVER_USER}@${SERVER_HOST}"
echo "Container CLI: ${CONTAINER_CLI}"
echo "=========================================================="

# ------------------------------------------------------------------------------
# STEP 1: Build frontend statico Next.js (out/)
# ------------------------------------------------------------------------------
echo "[1/5] Compilazione statica Next.js (output: export)..."
npm run build

if [ ! -d "out" ]; then
    echo "Errore: la directory out/ non e stata generata." >&2
    exit 1
fi

# ------------------------------------------------------------------------------
# STEP 2: Sincronizzazione file statici con rsync --checksum (zero-usura eMMC)
# Solo i file con hash differente vengono scritti sulla eMMC.
# ------------------------------------------------------------------------------
echo "[2/5] Sincronizzazione out/ -> ${REMOTE_STATIC_DIR}/ con --checksum..."
ssh "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${REMOTE_STATIC_DIR}"
rsync -av --checksum --delete out/ "${SERVER_USER}@${SERVER_HOST}:${REMOTE_STATIC_DIR}/"

# ------------------------------------------------------------------------------
# STEP 3: Build immagine Docker backend (scratch + binario Go statico)
# ------------------------------------------------------------------------------
echo "[3/5] Compilazione immagine backend..."
$CONTAINER_CLI build -t "$IMAGE_REF" ./backend

echo "[4/5] Esportazione e compressione immagine in ${LOCAL_ARCHIVE}..."
$CONTAINER_CLI save "$IMAGE_REF" | gzip > "$LOCAL_ARCHIVE"

# ------------------------------------------------------------------------------
# STEP 4: Trasferimento immagine in /tmp (RAM tmpfs sul server Debian)
# ------------------------------------------------------------------------------
echo "[5/5] Trasferimento immagine e configurazione sul server..."
scp "$LOCAL_ARCHIVE" "${SERVER_USER}@${SERVER_HOST}:/tmp/portfolio-backend.tar.gz"
rm -f "$LOCAL_ARCHIVE"

echo "Sincronizzazione docker-compose.yml in ${REMOTE_BACKEND_DIR}..."
ssh "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${REMOTE_BACKEND_DIR}"
rsync -av --checksum backend/docker-compose.yml "${SERVER_USER}@${SERVER_HOST}:${REMOTE_BACKEND_DIR}/"

if [ -f "backend/.env" ]; then
    echo "Sincronizzazione sicura di backend/.env sul server..."
    rsync -av --checksum backend/.env "${SERVER_USER}@${SERVER_HOST}:${REMOTE_BACKEND_DIR}/"
else
    echo "Nota: backend/.env non trovato localmente; assicurati che esista in ${REMOTE_BACKEND_DIR}/.env sul server." >&2
fi

# ------------------------------------------------------------------------------
# STEP 5: Caricamento immagine da RAM e riavvio del container
# ------------------------------------------------------------------------------
ssh "${SERVER_USER}@${SERVER_HOST}" bash -s -- "$REMOTE_BACKEND_DIR" << 'EOF'
set -euo pipefail
REMOTE_BACKEND_DIR="$1"

trap 'rm -f /tmp/portfolio-backend.tar.gz' EXIT

# Carica l'immagine dal tarball in RAM (/tmp)
docker load < /tmp/portfolio-backend.tar.gz

# Rimuove subito il file da /tmp per liberare la RAM
rm -f /tmp/portfolio-backend.tar.gz

# Avvia o aggiorna il container con docker compose
cd "$REMOTE_BACKEND_DIR"
docker compose up -d --remove-orphans

echo "Container portfolio-backend avviato con successo."
docker ps --filter "name=portfolio-backend" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
EOF

echo "=========================================================="
echo "Deploy completato senza scritture inutili sulla eMMC."
echo "=========================================================="
