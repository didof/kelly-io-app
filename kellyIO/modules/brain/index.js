import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      skills: [],
      activeSkill: null,
      index: 0,

      confidenceThreshold: 0.5,

      tmpLine: '',
      queue: [],
    };
  },
  getters,
  mutations,
  actions,
};
