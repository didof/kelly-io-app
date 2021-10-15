import createPlugin from "./utils";

export default createPlugin({
  name: "open page",
  commands: () => ["open page"],
  help: () =>
    "Go to skill plugin only works if vue router is enabled in the project. It hijacks the website routing and allows you to navigate saying something like 'go to contact page'.",
  script: [
    {
      createLine: () => "Which?",
    },
    {
      createKeywords: () => ["*"],
      createLine: () => "Oky-doki! Opening page!",
      exec: (context, { input }) => {
        // TODO logic that recognize if http or https already in, www, etc.
        window.open(`https://www.${input}`);
      },
    },
  ],
});
