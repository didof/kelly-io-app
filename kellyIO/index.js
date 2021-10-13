import { log } from "./utils";

import * as modules from "./modules";
import * as components from "./components";

import { RecognizeNameSkill } from "./skills";

const PREFIX = "kelly";

const defaultOptions = {
  confidenceThreshold: 0.6,
  skills: [RecognizeNameSkill],
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
    store.dispatch(`${PREFIX}/ears/setConfidenceThreshold`, {
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

export function createKellyIOConfiguration({ confidenceThreshold, skills }) {
  if (typeof confidenceThreshold !== "number")
    crack("[confidenceThreshold] must be a number");
  if (confidenceThreshold < 0 || confidenceThreshold > 1)
    crack("[confidenceThreshold] must be a value between 0 and 1");

  if (typeof skills !== "function") crack("[skills] must be a function");

  // TODO check if all skills are constructors
  const mergedSkills = skills(defaultOptions.skills);

  return {
    confidenceThreshold,
    skills: mergedSkills,
  };

  function crack(...args) {
    log(...args);
    throw new Error(...args);
  }
}

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
