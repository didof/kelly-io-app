<template>
  <nav>
    <ul>
      <li><router-link to="/">Go to Home</router-link></li>
      <li><router-link to="/morsecode">Go to Morsecode</router-link></li>
    </ul>
  </nav>

  <pre>{{ queue }}</pre>

  <main>
    <button @click="handle_start" :disabled="isStartDisabled">start</button>
    <button @click="handle_stop" :disabled="isStopDisabled">stop</button>
  </main>

  <router-view></router-view>

  <KellySpeechConfirmationModal />
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useKelly } from "../kellyIO";

export default defineComponent({
  name: "app",
  setup() {
    const store = useStore();

    const { Kgetters, Kdispatch } = useKelly(store, { setup: true });

    const isStartDisabled = computed(() => !Kgetters["system/isIdle"]);
    const isStopDisabled = computed(() => !Kgetters["system/isRecording"]);
    const queue = computed(() => Kgetters["brain/queue"]);

    return {
      isStartDisabled,
      isStopDisabled,
      queue,
      handle_start,
      handle_stop,
    };

    function handle_start() {
      Kdispatch("ears/startRecognition");
    }

    function handle_stop() {
      Kdispatch("ears/stopRecognition");
    }
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

main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
