/* eslint-disable */
const defaultOptions = {
  blockFlow: false,
  help: () => {
    return "I am a plugin. I can be customized.";
  },
  script: [
    {
      keywords: ["noop"],
      createLine: () => "Noop",
    },
  ],
};

// export function createKellyPlugin(options = defaultOptions) {
//   const { blockFlow, help, script } = Object.assign(defaultOptions, options);
  
//   return {
//       onTrigger: function() {

//       }
//   }

//   return function KellyPlugin(context, input) {
//     const { index } = context.getters;

//     const { keywords } = script[index];

//     if (hasBeenInvoked(keywords, input)) {
//       console.log("triggered");

//       if (blockFlow) return false;
//     }
//   };

//   return function KellyPlugin(context, input) {};
// }
