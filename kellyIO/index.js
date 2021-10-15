import { log } from "./utils";

import * as modules from "./modules";
import * as components from "./components";

import { HelpSkill, ConfusionSkill, GoToSkill, OpenPageSkill } from "./skills";

import { defineKRecorder } from "./components";

const TAIL_SKILLS = [HelpSkill, ConfusionSkill];

const defaultOptions = {
  confidenceThreshold: 0.5,
  skills: [],
};

export default {
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
    const installPlugin = createPluginInstaller(app);
    skills.forEach(installPlugin);
    TAIL_SKILLS.forEach(installPlugin);

    log("Attacching [$kelly] to Vue instance");
    attachToGlobal();

    log("Setup completed");

    function createPluginInstaller(app) {
      const store = app.config.globalProperties.$store;
      return function installPlugin(plugin) {
        plugin.install(store);
        plugin.saveDependencies(app);
      };
    }

    function attachToGlobal(options) {
      app.config.globalProperties.$kelly = {
        prefix: "kelly",
        ...options,
      };
    }
  },
};

const defaultUseKellyOptions = { setup: false };
export function useKelly(store, options = defaultUseKellyOptions) {
  options = Object.assign(defaultUseKellyOptions, options);

  if (options.setup) {
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

export { GoToSkill, OpenPageSkill };
export { defineKRecorder };
