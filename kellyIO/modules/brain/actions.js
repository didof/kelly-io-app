import { TYPES } from "../modal/shared";

/**
 * Config
 */
export function setConfidenceThreshold({ commit }, payload) {
  commit("setConfidenceThreshold", payload);
}

export function learn(context, payload) {
  const { name, script } = payload;

  const commands = payload.commands(context);
  context.commit("setCommand", { name, commands });

  const help = payload.help(context);
  context.commit("setHelp", { name, help });

  context.commit("setScript", { name, script });
}

export function setDependency(context, { dependencyName, dependency }) {
  if (context.getters.dependencies.has(dependencyName)) return;

  context.commit("setDependency", { dependencyName, dependency });
}

/**
 * Input
 */
export function sendTranscript(
  { commit, dispatch, getters },
  { transcript, confidence }
) {
  const { confidenceThreshold } = getters;

  commit("addUserRecord", { line: transcript.toLowerCase(), confidence });

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
  const { engagedWith, input, scripts, dependency, index } = context.getters;

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

    speakUp(context, line);

    if (skillScript.length > 1) {
      context.commit("engage", { name: found });
      context.commit("nextIndex");
    }
  } else {
    // engaged

    const script = scripts.get(engagedWith);
    const { useDependencies, createKeywords, createLine, exec } = script[index];

    const dependencies = useDependencies
      ? useDependencies.reduce((acc, cur) => {
          acc[cur] = dependency(cur);
          return acc;
        }, {})
      : {};

    const keywords = createKeywords(context);
    let trigger = "";
    if (keywords.includes("*")) {
      trigger = "*";
    } else {
      trigger = keywords.find((keyword) => input.includes(keyword));
    }

    let line = "";
    let isRecover = false;
    if (!trigger) {
      isRecover = true;
      line = getRecoverLine(script[index], input);
    } else {
      line = createLine(context, input, trigger);
    }

    speakUp(context, line);

    const additionary = {
      dependencies,
      line,
      isRecover,
      input,
      trigger,
    };

    if (exec) exec(context, additionary);

    if (index < script.length - 1) {
      if (isRecover) return;
      context.commit("nextIndex");
    } else {
      context.commit("disengage");
      context.commit("resetIndex");
    }

    function getRecoverLine(script, input) {
      const { createRecover } = script;
      if (!createRecover) return `Sorry, I could not understand ${input}`;
      return createRecover(context, input);
    }
  }

  function speakUp(context, line) {
    context.dispatch("kelly/mouth/setLine", { line }, { root: true });
    context.dispatch("kelly/mouth/speak", undefined, { root: true });
    context.commit("addKellyRecord", { line });
  }
}
