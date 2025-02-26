import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.phnegocios.app',
  appName: 'PH Negocios',
  webDir: 'dist',
  server: {
    cleartext: true // Permite requisições HTTP em vez de apenas HTTPS
  },
  plugins: {
    OneSignal: {
      appId: '3dc54551-d79e-4fe5-a7b4-f59b2c76eb17', // Substitua pelo App ID do OneSignal
    },
  }
};

export default config;
