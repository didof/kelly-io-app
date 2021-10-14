import { log } from "./utils";

import * as modules from "./modules";
import * as components from "./components";

import { HelpSkill, ConfusionSkill } from "./skills";

const DEFAULT_SKILLS = [HelpSkill, ConfusionSkill];

const defaultOptions = {
  confidenceThreshold: 0.5,
  skills: () => DEFAULT_SKILLS,
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
      store.registerModule("kelly/" + name, module);
    });

    log(`Setting confidence threshold to [${confidenceThreshold}]`);
    store.dispatch("kelly/brain/setConfidenceThreshold", {
      confidenceThreshold,
    });

    log("Registering components into app");
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    log("Learning new skills");
    skills(DEFAULT_SKILLS).forEach((plugin) => {
      plugin.install(store);
    });

    log("Attacching [$kelly] to Vue instance");
    app.config.globalProperties.$kelly = {
      prefix: "kelly",
    };

    log("Setup completed");
  },
};

export function useKelly(store, { setup = false }) {
  if (setup) {
    store.dispatch(`kelly/ears/setup`);
    store.dispatch(`kelly/mouth/setup`);
  }

  return {
    Kgetters: new Proxy(store.getters, {
      get(target, prop) {
        return target[`kelly/${prop}`];
      },
    }),
    Kdispatch: function (type, payload, options) {
      store.dispatch(`kelly/${type}`, payload, options);
    },
  };
}
