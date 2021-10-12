import * as modules from "./modules";
import * as components from "./components";

const defaultOptions = {
  prefix: null,
  confidenceThreshold: 0.6,
};

const config = { ...defaultOptions };

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
    config.prefix = prefix;

    log(`Setting confidence threshold to [${confidenceThreshold}]`);
    store.dispatch("kelly/ears/setConfidenceThreshold", {
      confidenceThreshold,
    });

    log(`Registering components into app`);
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })

    log(`Attacching [$kelly] to Vue instance`);
    app.config.globalProperties.$kelly = {
      prefix,
    };

    log("Setup completed");
  },
};

export function useKelly(store, { setup = false }) {
  if (setup) store.dispatch("kelly/ears/setup");

  const { prefix } = config;

  return {
    Kgetters: new Proxy(store.getters, {
      get(target, prop) {
        return target[`${prefix}/${prop}`];
      },
    }),
    Kdispatch: function (type, payload, options) {
      store.dispatch(`${prefix}/${type}`, payload, options);
    },
  };
}

function log(...args) {
  console.info("[KellyIO] - ", ...args);
}
