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
  if (context.getters.engagedWith == null) processNewCommand(context);
  else processScriptStep(context);
}

function processNewCommand(context) {
  const { commands, input, scripts, index } = context.getters;

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
}

function processScriptStep(context) {
  const { relevantScriptStep, input, dependency } = context.getters;

  /**
   * Check input versus keywords
   */
  const keywords = relevantScriptStep.createKeywords(context);

  let found = "";
  if (keywords instanceof RegExp) {
    found = input.match(keywords);
  } else {
    found = keywords.find((keyword) => input.includes(keyword));
  }

  /**
   * If not found, tell recover line and return
   */
  if (!found) {
    const line = getRecoverLine(relevantScriptStep.createRecover, input);
    speakUp(context, line);
    quit(context);
    return;
  }

  /**
   * If found, check validity of found
   */
  if (relevantScriptStep.validateFound) {
    const output = relevantScriptStep.validateFound(context, found);
    if (typeof output === "string") {
      speakUp(context, output);
      quit(context);
      return;
    }
  }

  if (relevantScriptStep.exec) {
    const additionary = {
      input,
      trigger: found,
    };

    const { useDependencies } = relevantScriptStep;
    if (useDependencies) {
      additionary.dependencies = useDependencies.reduce((acc, cur) => {
        acc[cur] = dependency(cur);
        return acc;
      }, {});
    }

    relevantScriptStep.exec(context, additionary);
  }

  /**
   * Build up response
   */
  const line = relevantScriptStep.createLine(context, input, found);
  speakUp(context, line);

  if (context.getters.isScriptDone) {
    quit(context);
  } else {
    context.commit("nextIndex");
  }

  function getRecoverLine(createRecover, input) {
    if (!createRecover) return `Sorry, I could not understand ${input}`;
    return createRecover(context, input);
  }
}

function speakUp(context, line) {
  context.dispatch("kelly/mouth/setLine", { line }, { root: true });
  context.dispatch("kelly/mouth/speak", undefined, { root: true });
  context.commit("addKellyRecord", { line });
}

function quit(context) {
  context.commit("disengage");
  context.commit("resetIndex");
}
