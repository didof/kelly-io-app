import * as modules from "./modules";

const defaultOptions = {
  prefix: null,
  confidenceThreshold: 0.6,
};

export const KellyIO = {
  install(app, options) {
    const { prefix, confidenceThreshold } = Object.assign(
      defaultOptions,
      options
    );

    const store = app.config.globalProperties.$store;
    if (!store) throw new Error("Please, instantiate Vue.use(store) first");

    log("Registering modules into store");
    if (typeof prefix === "string") log(`Using prefix [${prefix}]`);
    
    Object.entries(modules).forEach(([name, module]) => {
      if (typeof prefix === "string") name = prefix + "/" + name;
      store.registerModule(name, module);
    });

    log(`Setting confidence threshold to [${confidenceThreshold}]`)
    store.dispatch("kelly/ears/setConfidenceThreshold", {
      confidenceThreshold,
    });

    log(`Attacching [$kelly] to Vue instance`)
    app.config.globalProperties.$kelly = {
      prefix,
      dispatch(type, payload, options) {
        store.dispatch(`kelly/${type}`, payload, options);
      },
    };

    log('Setup completed')
  },
};

function log(...args) {
  console.info("[KellyIO] - ", ...args);
}
