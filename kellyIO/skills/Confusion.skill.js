import createPlugin from "./utils";

export default createPlugin({
  name: "confusion",
  commands: () => ["*"],
  help: () =>
    "Confusion skill plugin is the last stand in the pipeline. When all the other skills failed to get triggered, it comes in.",
  script: [
    {
      createLine: (_, input) =>
        `Sorry, I could not understand the phrase: ${input}. Try to repeat it or ask for help.`,
    },
  ],
});
