<template>
  <!-- <nav>
    <ul>
      <li><router-link to="/">Go to Home</router-link></li>
      <li><router-link to="/morsecode">Go to Morsecode</router-link></li>
    </ul>
  </nav> -->

  <pre>{{ activeSkill }}</pre>
  <pre>{{ queue }}</pre>

  <router-view></router-view>

  <ClickRecorder />

  <SpeechConfirmationModal />
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useKelly } from "../kellyIO";

import ClickRecorder from "./components/ClickRecorder.vue";
import SpeechConfirmationModal from "./components/SpeechConfirmationModal.vue";

export default defineComponent({
  name: "app",
  components: {
    ClickRecorder,
    SpeechConfirmationModal,
  },
  setup() {
    const store = useStore();

    const { Kgetters } = useKelly(store, { setup: true });

    const queue = computed(() => Kgetters["brain/queue"]);
    const activeSkill = computed(() => Kgetters["brain/activeSkill"]);

    return {
      queue,
      activeSkill,
    };
  },
});
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Press Start 2P", cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
}

ul {
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
