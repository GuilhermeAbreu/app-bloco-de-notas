import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.com.abreu.guilherme.notas',
  appName: 'Notas',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    StatusBar: {
      overlaysWebView: true,
    },
    LocalNotifications: {
      smallIcon: 'ic_launcher',
      iconColor: '#150e3a',
      sound: 'notification',
    },
  },
};

export default config;
