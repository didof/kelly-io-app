const defaultOptions = {
  blockFlow: true,
  help: () => {
    return "Help skill plugin is a must-have one. It is invoked by the word help.";
  },
  script: [
    {
      createKeywords: () => ["help"],
      createLine: (context) => {
        const skillsNameList =
          context.rootGetters["kelly/brain/skillsNameList"].join(". ");
        const skillsAmount = context.rootGetters["kelly/brain/skillsAmount"];

        return `
          I know several skills.
          Here a list of some. ${skillsNameList}.
          ${skillsAmount > 2 ? `${skillsAmount} skills, not bad, in my humble opinion. ` : ''}
          Which one would you like me to explain?
        `;
      },
    },
    {
      createKeywords: (context) =>
        context.rootGetters["kelly/brain/skillsNameList"],
      createLine: (context, input) => {
        const skills = context.rootGetters["kelly/brain/skills"];
        console.log(skills);
        const requestedSkill = skills.find(({ name }) => input.includes(name));

        if (!requestedSkill)
          return "Ehm... Wait, I'm confused. Sorry, try again.";

        const h = requestedSkill.help(context);

        return `
          You asked for ${requestedSkill.name} skill explanation. ${h}
        `;
      },
      createRecoverLine: (context, input) => {
        return `Sorry, I could not understand: ${input}.`;
      },
    },
  ],
};

// TODO mentre parla, impedire di premere start
// TODO ogni risposta accetta sempre la keyword <abort|cancel|nevermind> che resetta tutto

export default function HelpSkillConstructor(options = {}) {
  const { blockFlow, script, help } = Object.assign(defaultOptions, options);

  return {
    name: "help",
    scriptLength: script.length,
    help,
    plugin: function HelpSkill(context, input) {
      const { index } = context.getters;
      const { createKeywords, createLine } = script[index];

      const keywords = createKeywords(context);

      if (hasBeenInvoked(keywords, input)) {
        const line = createLine(context, input);

        context.dispatch("kelly/mouth/setLine", { line }, { root: true });
        context.dispatch("kelly/mouth/speak", undefined, { root: true });

        if (blockFlow) return false;
      }

      if (index === 0) return input;

      const { createRecoverLine } = script[index];

      const recoveLine = createRecoverLine(context, input);
      context.dispatch(
        "kelly/mouth/setLine",
        { line: recoveLine },
        { root: true }
      );
      context.dispatch("kelly/mouth/speak", undefined, { root: true });
    },
  };
}

function hasBeenInvoked(keywords, input) {
  const i = input.toLowerCase();
  return keywords
    .map((keyword) => keyword.toLowerCase())
    .some((keyword) => i.includes(keyword));
}
