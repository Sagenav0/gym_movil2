import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
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
