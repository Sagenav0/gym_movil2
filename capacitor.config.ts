import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dg.digitalforge.starter',
  appName: 'proyecto-movil',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
  android:{
    allowMixedContent:true,
  }
};

export default config;
