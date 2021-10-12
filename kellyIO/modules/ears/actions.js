export function setup({ commit, dispatch, getters }) {
  commit("createInstance");

  commit("setConfigContinuous", { continuos: false });

  commit("setConfigGrammar", { grammar: createDefaultGrammar() });

  commit("setConfigLang", { lang: "en-US" });

  commit("setConfigOnResult", (event) => {
    console.info("onresult", event);

    const { transcript, confidence } = event.results[0][0];

    dispatch("kelly/brain/setInput", { transcript }, { root: true });

    if (confidence < getters.confidenceThreshold) {
      dispatch(
        "kelly/brain/askTranscriptConfirmation",
        { transcript },
        { root: true }
      );
    } else {
      commit("addTranscript", { transcript });
      dispatch("kelly/brain/interpret", undefined, { root: true });
    }

    commit("stopRecognition");
    dispatch("kelly/system/setIdleStatus", undefined, { root: true });
  });

  commit("setConfigOnSpeechEnd", (event) => {
    console.info("onspeechend", event);

    // TODO please, speak more

    commit("stopRecognition");
    dispatch("kelly/system/setIdleStatus", undefined, { root: true });
  });

  commit("setConfigOnNoMatch", (event) => {
    console.log("onnomatch", event);

    commit("stopRecognition");
    dispatch("kelly/system/setIdleStatus", undefined, { root: true });
  });

  commit("setConfigOnError", (event) => {
    console.info("onerror", event);

    if (event.error === "no-speech") {
      console.log("TODO: Please, give me a command");
    }

    commit("stopRecognition");
    dispatch("kelly/system/setIdleStatus", undefined, { root: true });
  });

  dispatch("kelly/system/setIdleStatus", undefined, { root: true });
}

export function setConfidenceThreshold({ commit }, payload) {
  commit("setConfidenceThreshold", payload);
}

// TODO replicate for setConfigGrammar, setConfigLang
export function setConfigContinuous({ commit, getters }, payload) {
  if (getters.hasBeenInitializated) commit("setConfigContinuous", payload);
  else
    console.warn(
      `[kelly/ears/setConfigContinuos] has been called before <recognition> initialization.`
    );
}

/**
 * Usage
 */

export function startRecognition({ commit, dispatch }) {
  dispatch("kelly/system/setRecordingStatus", undefined, { root: true });
  commit("startRecognition");
}

export function stopRecognition({ commit, dispatch }) {
  dispatch("kelly/system/setIdleStatus", undefined, { root: true });
  commit("stopRecognition");
}

/**
 * Utils
 */
function createDefaultGrammar() {
  const colors = [
    "aqua",
    "azure",
    "beige",
    "bisque",
    "black",
    "blue",
    "brown",
    "chocolate",
    "coral",
  ];
  const grammar =
    "#JSGF V1.0; grammar colors; public <color> = " + colors.join(" | ") + " ;";

  return grammar;
}
