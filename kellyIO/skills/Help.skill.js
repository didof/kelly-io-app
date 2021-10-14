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
        const skillsAmount = skillsNameList.length;

        return `
          I know several skills.
          Here a list of some. ${skillsNameList}.
          ${
            skillsAmount > 2
              ? `${skillsAmount} skills, not bad, in my humble opinion. `
              : ""
          }
          Which one would you like me to explain?
        `;
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
    },
  ],
  exec: (context, line) => {
    context.dispatch("kelly/mouth/setLine", { line }, { root: true });
    context.dispatch("kelly/mouth/speak", undefined, { root: true });
  },
});
