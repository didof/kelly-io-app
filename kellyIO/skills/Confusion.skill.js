const defaultOptions = {
  help: () =>
    "Confusion skill plugin is the last stand in the pipeline. When all the other skills failed to get triggered, it comes in.",
  createLine: (_, input) =>
    `Sorry, I could not understand the phrase: ${input}. Try to repeat it or ask for help.`,
};

export default function ConfusionSkillConstructor(options = defaultOptions) {
  const { createLine, help } = Object.assign(defaultOptions, options);

  return {
    name: "confusion",
    scriptLength: 1,
    help,
    plugin: function ConfusionSkill(context, input) {
      console.log(input)
      context.dispatch(
        "kelly/mouth/setLine",
        { line: createLine(context, input) },
        { root: true }
      );
      context.dispatch("kelly/mouth/speak", undefined, { root: true });
      return false;
    },
  };
}
