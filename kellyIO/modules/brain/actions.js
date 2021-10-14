import { TYPES } from "../modal/shared";

/**
 * Config
 */
export function setConfidenceThreshold({ commit }, payload) {
  commit("setConfidenceThreshold", payload);
}

export function learn(context, payload) {
  const { name, exec, script } = payload;

  const commands = payload.commands(context);
  context.commit("setCommand", { name, commands });

  const help = payload.help(context);
  context.commit("setHelp", { name, help });

  context.commit("setExec", { name, exec });

  context.commit("setScripts", { name, script });
}

/**
 * Input
 */
export function sendTranscript(
  { commit, dispatch, getters },
  { transcript, confidence }
) {
  const { confidenceThreshold } = getters;

  commit("addUserRecord", { line: transcript, confidence });

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

/**
 * Output
 */
export function process(context) {
  const { engagedWith, input, scripts, index, execs } = context.getters;

  // not engaged
  if (engagedWith == null) {
    const { commands } = context.getters;

    let found = null;
    Array.from(commands.entries()).forEach(([name, commands]) => {
      if (found) return;
      if (input.includes(commands)) found = name;
    });
    if (!found) found = "confusion";

    const skillScript = scripts.get(found);

    const { createLine } = skillScript[index];
    const line = createLine(context, input);
    context.commit("addKellyRecord", { line });

    const exec = execs.get(found);
    exec(context, line, input);

    if (skillScript.length > 1) {
      console.log(found);
      context.commit("engage", { name: found });
      context.commit("nextIndex");
    }
  } else {
    // engaged

    const skillScript = scripts.get(engagedWith);
    const { createKeywords, createLine } = skillScript[index];

    const keywords = createKeywords(context);
    const trigger = keywords.find((keyword) => input.includes(keyword));
    if (!trigger) {
      // TODO
      // ask again
      console.log("ask again");
      return;
    }

    const line = createLine(context, input, trigger);
    context.commit("addKellyRecord", { line });

    const exec = execs.get(engagedWith);
    exec(context, line, input);

    if (index < skillScript.length - 1) {
      context.commit("nextIndex");
    } else {
      context.commit("disengage");
      context.commit("resetIndex");
    }
  }
}
