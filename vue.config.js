module.exports = {
  publicPath: './',
  runtimeCompiler: true,
  pwa: {
    workboxOptions: {
      exclude: [/OneSignal.*\.js$/],
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
};
