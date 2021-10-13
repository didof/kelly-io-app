export function createInstance(state) {
  state.synth = window.speechSynthesis
  state.voices = state.synth.getVoices()
}

export function setLine(state, { line }) {
  state.line = line;
}

export function reset(state) {
  state.line = "";
}
