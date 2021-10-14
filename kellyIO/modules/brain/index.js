import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      // config
      confidenceThreshold: 0.5,

      commands: new Map(),
      helps: new Map(),
      scripts: new Map(),
      dependencies: new Map(),

      engagedWith: null,
      index: 0,

      // history
      queue: [],
    };
  },
  getters,
  mutations,
  actions,
};
