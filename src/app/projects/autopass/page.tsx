import type { Metadata } from 'next';
import AutoPassShowcase from '@/components/projects/AutoPassShowcase';

export const metadata: Metadata = {
  title: 'AutoPass 🚗⚡ — Davide Ferraro',
  description: 'Sistema IoT ESP32 per l\'apertura automatica di cancelli o garage tramite rilevamento di vicinanza iBeacon (NimBLE), timer cooldown e aggiornamenti Wi-Fi ArduinoOTA.',
};

export default function AutoPassPage() {
  return <AutoPassShowcase />;
}
