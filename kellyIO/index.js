import * as modules from "./modules";

const defaultOptions = {
  prefix: null,
};

export const KellyIO = {
  install(app, options) {
    const { prefix } = Object.assign(defaultOptions, options);

    const store = app.config.globalProperties.$store;

    if (!store) throw new Error("Please, instantiate Vue.use(store) first.");

    Object.entries(modules).forEach(([name, module]) => {
      if (typeof prefix === "string") name = prefix + "/" + name;
      store.registerModule(name, module);
    });

    log("Successfully injected Kelly into store");
    if (typeof prefix === "string") log(`Prefix [${prefix}]`);
  },
};

function log(...args) {
  console.info("[KellyIO] - ", ...args);
}
