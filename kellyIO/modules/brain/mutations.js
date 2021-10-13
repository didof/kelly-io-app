export function setInput(state, { input }) {
  state.input = input;
}

export function clearInput(state) {
  state.input = "";
}

export function interpret(state) {
  if (state.input === "") {
    console.warn(
      "[KellyIO]",
      "[brain/mutations/interpret] has been called, but input is empty string. This is not supposed to happen."
    );
    return
  }

  
  // TODO logic
}
