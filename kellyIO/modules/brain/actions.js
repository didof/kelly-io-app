import { TYPES } from "../modal/shared";

/**
 * Config
 */
export function setConfidenceThreshold({ commit }, payload) {
  commit("setConfidenceThreshold", payload);
}

export function learn(context, payload) {
  context.commit("learn", payload);
}

/**
 * Input
 */
export function sendTranscript(
  { commit, dispatch, getters },
  { transcript, confidence }
) {
  const { confidenceThreshold } = getters;

  commit("addLine", { line: transcript });

  if (confidence < confidenceThreshold) {
    dispatch(
      "kelly/modal/setType",
      { type: TYPES.SPEECH_RECOGNITION },
      { root: true }
    );
    // TODO content should be array like
    dispatch("kelly/modal/setContent", { content: transcript }, { root: true });
    dispatch("kelly/modal/open", undefined, { root: true });
  } else {
    dispatch("process");
  }
}

export function abort({ commit, dispatch }) {
  dispatch("kelly/modal/reset", undefined, { root: true });
  commit("amendLastLine");
}

export function confirm({ dispatch }) {
  dispatch("kelly/modal/reset", undefined, { root: true });
  dispatch("process");
}

export function incrementLine({ commit }) {
  commit("incrementLine");
}

/**
 * Output
 */
export function process(context) {
  const { commit, getters } = context;
  const { noActiveSkill, input, skills, index } = getters;

  if (noActiveSkill) {
    const { activeSkill } = pipeline(context, skills, input);
    commit("nextLine");

    if (isConfused(activeSkill.name)) return;
    if (isDone(activeSkill.scriptLength, index)) return;

    commit("setActiveSkill", { activeSkill });
  } else {
    const { activeSkill } = getters;

    activeSkill.plugin(context, input);
    commit("nextLine");

    if (isDone(activeSkill.scriptLength, index)) return;
  }

  function isConfused(skillName) {
    if (skillName !== "confusion") return;
    commit("reset");
    return true;
  }

  function isDone(length, index) {
    if (index < length - 1) return;
    commit("reset");
    return true;
  }

  function pipeline(context, skills, input) {
    let exit = false;
    let activeSkill = null;

    const output = skills.reduce((tmp, skill) => {
      if (exit) return tmp;

      const res = skill.plugin(context, tmp);

      if (!res) {
        exit = true;
        activeSkill = skill;
      }

      return res;
    }, input);

    return {
      activeSkill,
      output,
    };
  }
}
