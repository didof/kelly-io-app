import createPlugin from "./utils";

export default createPlugin({
  name: "go to",
  dependencies: (app) => {
    const router = app.config.globalProperties.$router;
    return [{ name: "router", dependency: router }];
  },
  commands: () => ["go to"],
  help: () =>
    "Go to skill plugin only works if vue router is enabled in the project. It hijacks the website routing and allows you to navigate saying something like 'go to contact page'.",
  script: [
    {
      createLine: () => `Which page you want to change?`,
    },
    {
      useDependencies: ["router"],
      createKeywords: (context) => {
        const router = context.rootGetters["kelly/brain/dependency"]("router");
        const routes = router.getRoutes();
        return routes.map(({ name }) => name);
      },
      createLine: (context, input, trigger) => `
            Oky-doki! Routing to ${trigger}!
        `,
      exec: (context, { dependencies, trigger }) => {
        debugger;
        dependencies.router.push({ name: trigger });
      },
    },
  ],
});
