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
      createKeywords: () => new RegExp(/.+/),
      validateFound: (context, found) => {
        console.log(context, found);
        return null;
        // const websiteRegex =
        //   /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

        // return input.match(websiteRegex);
      },
      createLine: () => "Oky-doki! Opening page!",
      exec: (context, { input }) => {
        console.log(context, input);
      },
    },
  ],
});
