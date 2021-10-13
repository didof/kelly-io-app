export function setInput(state, { input }) {
  state.input = input;
}

export function clearInput(state) {
  state.input = "";
}

export function learn(state, { skillInstance }) {
  state.skills.push(skillInstance);
}

export function interpret(state, output) {
  if (state.input === "") {
    console.warn(
      "[KellyIO]",
      "[brain/mutations/interpret] has been called, but input is empty string. This is not supposed to happen."
    );
    return;
  }

  state.output = { output };

  // TODO logic
}
