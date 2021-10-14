// TODO memoize name, commands and alert if conflicts

export default function createPlugin({ name, commands, help, script, exec }) {
  return {
    install(store) {
      store.dispatch(
        "kelly/brain/learn",
        {
          name: this.name,
          commands: this.commands,
          help: this.help,
          exec: this.exec,
          script: this.script,
        },
        { root: true }
      );
    },
    name,
    commands,
    help,
    script,
    exec,
  };
}
