/* eslint-disable */
module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  pwa: {
    manifestOptions: {
      name: 'Eleby Fitness',
      short_name: 'E-Fitness',
      icons: [
        {
          src: './img/icons/android-icon-36x36.png',
          sizes: '36x36',
          type: 'image/png',
        },
        {
          src: './img/icons/android-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: './img/icons/android-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: './img/icons/android-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: './img/icons/android-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: './img/icons/android-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
      ],
      start_url: '.',
      display: 'standalone',
      background_color: '#000000',
      theme_color: '#f9a825',
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
