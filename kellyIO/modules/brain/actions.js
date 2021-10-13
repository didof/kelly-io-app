import { TYPES } from "../modal/shared";

export function askTranscriptConfirmation({ dispatch }, payload) {
  dispatch("kelly/modal/setType", { type: TYPES.SPEECH_RECOGNITION }, { root: true });
  dispatch("kelly/modal/setContent", { content: payload.transcript }, { root: true });
  dispatch("kelly/modal/open", undefined, { root: true });
}

export function abort({ commit, dispatch }) {
  dispatch("kelly/modal/reset", undefined, { root: true });
  commit("clearInput");
}

export function interpret({ commit, dispatch }) {
  dispatch("kelly/modal/reset", undefined, { root: true });
  commit("interpret");
}

export function setInput({ commit }, payload) {
  commit("setInput", { input: payload.transcript });
}
