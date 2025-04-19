import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.abreu.guilherme.notas',
  appName: 'Notas',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
  },
};

export default config;
