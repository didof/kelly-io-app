export function setup({ commit }) {
  commit("createInstance");
}

export function setLine(context, payload) {
  context.commit("setLine", payload);
}

export function speak(context) {
  const { line, synth, rate } = context.getters;

  var utterance = new SpeechSynthesisUtterance(line);
  utterance.rate = rate;
  synth.speak(utterance);

  context.commit("reset");
}
