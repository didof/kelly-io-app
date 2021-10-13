import * as mutations from "./mutations";
import * as actions from "./actions";

export default {
  namespaced: true,
  state() {
    return {
      recognition: null,
      confidenceThresold: null,
      transcripts: [],
    };
  },
  mutations,
  actions,
};
