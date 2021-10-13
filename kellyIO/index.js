import { log } from "./utils";

import * as modules from "./modules";
import * as components from "./components";

import { HelpSkill, ConfusionSkill } from "./skills";

const PREFIX = "kelly";

const defaultOptions = {
  confidenceThreshold: 0.5,
  skills: [
    new HelpSkill(),
    new ConfusionSkill()
  ],
};

export const KellyIO = {
  install(app, options) {
    const { confidenceThreshold, skills } = Object.assign(
      defaultOptions,
      options
    );

    const store = app.config.globalProperties.$store;
    if (!store) throw new Error("Please, instantiate Vue.use(store) first");

    log("Registering modules into store");

    Object.entries(modules).forEach(([name, module]) => {
      store.registerModule(PREFIX + "/" + name, module);
    });

    log(`Setting confidence threshold to [${confidenceThreshold}]`);
    store.dispatch(`${PREFIX}/brain/setConfidenceThreshold`, {
      confidenceThreshold,
    });

    log("Registering components into app");
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    log("Learning new skills");
    skills.forEach((skill) => {
      store.dispatch(`${PREFIX}/brain/learn`, { skill });
    });

    log(`Attacching [$${PREFIX}] to Vue instance`);
    app.config.globalProperties.$kelly = {
      prefix: PREFIX,
    };

    log("Setup completed");
  },
};

export function useKelly(store, { setup = false }) {
  if (setup) {
    store.dispatch(`${PREFIX}/ears/setup`);
    store.dispatch(`${PREFIX}/mouth/setup`);
  }

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
