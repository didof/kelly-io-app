import { createStore,
  // createLogger
} from "vuex";

const debug = process.env.NODE_ENV !== "production";

// const plugins = debug ? [createLogger()] : [];

export const store = createStore({
  modules: {},
  strict: debug,
  // plugins
});
