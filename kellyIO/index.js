import { log } from "./utils";

import * as modules from "./modules";
import * as components from "./components";

const PREFIX = 'kelly'

const defaultOptions = {
  confidenceThreshold: 0.6,
};

export const KellyIO = {
  install(app, options) {
    const { confidenceThreshold } = Object.assign(
      defaultOptions,
      options
    );

    const store = app.config.globalProperties.$store;
    if (!store) throw new Error("Please, instantiate Vue.use(store) first");

    log("Registering modules into store");

    Object.entries(modules).forEach(([name, module]) => {
      store.registerModule(PREFIX + '/' + name, module);
    });

    log(`Setting confidence threshold to [${confidenceThreshold}]`);
    store.dispatch(`${PREFIX}/ears/setConfidenceThreshold`, {
      confidenceThreshold,
    });

    log(`Registering components into app`);
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    log(`Attacching [$${PREFIX}] to Vue instance`);
    app.config.globalProperties.$kelly = {
      prefix: PREFIX,
    };

    log("Setup completed");
  },
};

export function useKelly(store, { setup = false }) {
  if (setup) store.dispatch(`${PREFIX}/ears/setup`);

  return {
    Kgetters: new Proxy(store.getters, {
      get(target, prop) {
        return target[`${PREFIX}/${prop}`];
      },
    }),
    Kdispatch: function (type, payload, options) {
      store.dispatch(`${PREFIX}/${type}`, payload, options);
    },
  };
}
