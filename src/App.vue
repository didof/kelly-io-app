<template>
  <nav>
    <ul>
      <li><router-link to="/">Go to Home</router-link></li>
      <li><router-link to="/morsecode">Go to Morsecode</router-link></li>
    </ul>
  </nav>

  <main>
    <pre>lastTranscript: {{ lastTranscript }}</pre>

    <button @click="handle_start" :disabled="isStartDisabled">start</button>
    <button @click="handle_stop" :disabled="isStopDisabled">stop</button>
  </main>

  <router-view></router-view>

  <SpeechConfirmationModal />
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

import SpeechConfirmationModal from "./components/modal/SpeechConfirmationModal";

export default defineComponent({
  name: "app",
  components: {
    SpeechConfirmationModal,
  },
  setup() {
    const store = useStore();
    store.dispatch("kelly/ears/init");

    const isStartDisabled = computed(
      () => !store.getters["kelly/system/isIdle"]
    );
    const isStopDisabled = computed(
      () => !store.getters["kelly/system/isRecording"]
    );
    const lastTranscript = computed(
      () => store.getters["kelly/ears/lastTranscript"]
    );

    return {
      isStartDisabled,
      isStopDisabled,
      lastTranscript,
      handle_start,
      handle_stop,
    };

    function handle_start() {
      store.dispatch("kelly/ears/startRecognition");
    }

    function handle_stop() {
      store.dispatch("kelly/ears/stopRecognition");
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
