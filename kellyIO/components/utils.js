import { defineComponent } from "vue";
import { useStore } from "vuex";
import { useKelly } from "../index";

export default function crateKellyComponent(...features) {
  return function createKellyRecorderComponent({
    setup: forwardSetup,
    ...rest
  }) {
    let i = 0;

    return defineComponent({
      name: createName(i),
      ...rest,
      setup(props, context) {
        const store = useStore();
        const kelly = useKelly(store);

        const injects = features.reduce((acc, cur) => {
          acc[cur.name] = cur.bind(null, kelly);
          return acc;
        }, {});

        return forwardSetup({ props, context, store, kelly, ...injects });
      },
    });

    function createName(i) {
      return `kelly-recorder-component${i++ > 0 ? `-${i}` : ""}`;
    }
  };
}
