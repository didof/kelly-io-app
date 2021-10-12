module.exports = {
  pwa: {
    name: "kelly-io-demo",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js",
    },
  },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
  },
};
