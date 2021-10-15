import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useKelly } from "../index";

export default function crateKellyComponent({ name, features }) {
  return function createKellyRecorderComponent({
    setup: forwardSetup,
    ...rest
  }) {
    let i = 0;

    return defineComponent({
      name: createName(name, i),
      ...rest,
      setup(props, context) {
        const store = useStore();
        const kelly = useKelly(store);

        const injects = Object.entries(features).reduce(
          (acc, [name, feature]) => {
            acc[name] = feature.bind(null, kelly);
            return acc;
          },
          {}
        );

        return forwardSetup({
          props,
          context,
          store,
          kelly,
          features: injects,
        });
      },
    });

    function createName(name, i) {
      return `kelly-${name}-component${i++ > 0 ? `-${i}` : ""}`;
    }
  };
}
