module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  pwa: {
    workboxOptions: {
      exclude: [/OneSignal.*\.js$/],
    },
    iconPaths: {
      favicon32: 'img/icons/favicon-32x32.png',
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
