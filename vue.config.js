module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  pwa: {
    manifestOptions: {
      name: 'Eleby Fitness',
      // eslint-disable-next-line @typescript-eslint/camelcase
      short_name: 'E-Fitness',
      icons: [
        {
          src: './img/icon/android-icon-36x36.png',
          sizes: '36x36',
          type: 'image/png',
          density: '0.75',
        },
        {
          src: './img/icon/android-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
          density: '1.0',
        },
        {
          src: './img/icon/android-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
          density: '1.5',
        },
        {
          src: './img/icon/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
          density: '2.0',
        },
        {
          src: './img/icon/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
          density: '3.0',
        },
        {
          src: './img/icon/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          density: '4.0',
        },
      ],
      // eslint-disable-next-line @typescript-eslint/camelcase
      start_url: '/#/',
      display: 'standalone',
      // eslint-disable-next-line @typescript-eslint/camelcase
      background_color: '#000',
      // eslint-disable-next-line @typescript-eslint/camelcase
      theme_color: '#f9a825',
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
