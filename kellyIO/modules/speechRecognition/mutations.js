export function createInstance(state) {
  const SpeechRecognition = SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  // TODO config
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  state.recognition = recognition;
}

/**
 * setConfig
 */

export function setConfigContinuous(state, { continuos }) {
  state.recognition.continuous = continuos;
}

export function setConfigGrammar(state, { grammar }) {
  const SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;

  const speechRecognitionList = new SpeechGrammarList();
  speechRecognitionList.addFromString(grammar, 1);

  state.recognition.grammars = speechRecognitionList;
}

export function setConfigLang(state, { lang }) {
  state.recognition.lang = lang;
}

export function setConfigOnResult(state, cb) {
  state.recognition.onresult = cb;
}

export function setConfigOnSpeechEnd(state, cb) {
  state.recognition.onspeechend = cb;
}

export function setConfigOnNoMatch(state, cb) {
  state.recognition.onnomatch = cb;
}

export function setConfigOnError(state, cb) {
  state.recognition.onerror = cb;
}

/**
 * Usage
 */
export function startRecognition(state) {
  stopRecognition(state);
  state.recognition.start();
}

export function stopRecognition(state) {
  state.recognition.stop();
}

export function addTranscript(state, { transcript }) {
  state.transcripts.push(transcript);
}
