// TODO memoize name, commands and alert if conflicts
import { log } from "../utils";

export default function createPlugin({
  name,
  commands,
  help,
  script,
  dependencies = () => {},
}) {
  return {
    install(store) {
      store.dispatch(
        "kelly/brain/learn",
        {
          name: this.name,
          commands: this.commands,
          help: this.help,
          script: this.script,
        },
        { root: true }
      );
      log(`Skill learnt: ${name}`);
    },
    saveDependencies: (app) => {
      const deps = dependencies(app);
      if (!deps) return;
      const store = app.config.globalProperties.$store;
      deps.forEach(({ name, dependency }) => {
        store.dispatch(
          "kelly/brain/setDependency",
          { dependencyName: name, dependency },
          { root: true }
        );
      });
    },
    name,
    commands,
    help,
    script,
  };
}
