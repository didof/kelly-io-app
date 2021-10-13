export function setup({ commit }) {
  commit("createInstance");
}

export function setLine(context, payload) {
  context.commit("setLine", payload);
}

export function speak(context) {
  const { line, synth } = context.getters

  var utterance = new SpeechSynthesisUtterance(line);
  utterance.rate = 1
  synth.speak(utterance)

  context.commit("reset");
}
