import createPlugin from "./utils";

export default createPlugin({
  name: "help",
  commands: () => ["help"],
  help: () =>
    "Help skill plugin is a must-have one. It is invoked by the word help.",
  script: [
    {
      createLine: (context) => {
        const skillsNameList =
          context.rootGetters["kelly/brain/skillsNameList"].join(". ");

        return `Choose one of the following skills: ${skillsNameList}. Which one would you like me to explain?`;
      },
    },
    {
      createKeywords: (context) =>
        context.rootGetters["kelly/brain/skillsNameList"],
      createLine: (context, input, trigger) => {
        const helps = context.rootGetters["kelly/brain/helps"];
        const help = helps.get(trigger);

        return `
            You asked for ${trigger} skill explanation. ${help}
          `;
      },
      createRecover: (context, input) => {
        const skillsNameList =
          context.rootGetters["kelly/brain/skillsNameList"].join(". ");

        return `
          Sorry, I could not understand: ${input}. Please, say one of the following: ${skillsNameList}
        `;
      },
    },
  ],
});
