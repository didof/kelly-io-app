export function setIdleStatus({ commit }) {
  commit("setIdleStatus");
}

export function setRecordingStatus({ commit }) {
  commit("setRecordingStatus");
}

export function setSpeakingStatus({ commit }) {
  commit("setSpeakingStatus");
}

export function mockAction({ dispatch }, name) {
  dispatch(name);
}
