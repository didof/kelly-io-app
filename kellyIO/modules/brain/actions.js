import { TYPES } from "../modal/shared";

export function askTranscriptConfirmation({ dispatch }, payload) {
  dispatch(
    "kelly/modal/setType",
    { type: TYPES.SPEECH_RECOGNITION },
    { root: true }
  );
  dispatch(
    "kelly/modal/setContent",
    { content: payload.transcript },
    { root: true }
  );
  dispatch("kelly/modal/open", undefined, { root: true });
}

export function abort({ commit, dispatch }) {
  dispatch("kelly/modal/reset", undefined, { root: true });
  commit("clearInput");
}

export function setInput({ commit }, payload) {
  commit("setInput", { input: payload.transcript });
}

export function learn(context, { skill }) {
  const skillInstance = new skill(context);

  context.commit("learn", { skillInstance });
}

export function interpret({ commit, dispatch, getters }) {
  dispatch("kelly/modal/reset", undefined, { root: true });

  const skills = getters.skills;
  const input = getters.input;

  const output = skills.reduce((res, skill) => skill(res), input);

  console.log(output);

  commit("interpret", { output });
}
