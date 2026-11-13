# Stage 1: Build static Go binary
FROM golang:1.23-alpine AS builder

WORKDIR /app

RUN apk add --no-cache ca-certificates

COPY go.mod ./
COPY main.go ./

RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-s -w" -o /contact-server .

# Stage 2: Scratch image (massima leggerezza, zero attacco, zero dipendenze)
FROM scratch

# Certificati CA necessari per la verifica TLS con Register.it
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

# Binario statico
COPY --from=builder /contact-server /contact-server

EXPOSE 3001

USER 65534:65534

ENTRYPOINT ["/contact-server"]
