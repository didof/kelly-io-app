<template>
  <teleport to="#app">
    <transition name="fade">
      <div v-if="isOpen">
        <div class="backdrop" @click="handle_close"></div>
        <div class="modal">
          <h1>Confirmation</h1>
          <p>
            I got <i>{{ content }}</i>
          </p>
          <p>Is this right?</p>
          <div class="buttons">
            <button @click="handle_process">Yes</button>
            <button @click="handle_close">No</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "speech-confirmation-modal",
  setup() {
    const store = useStore();

    const isOpen = computed(() => {
      return (
        store.getters["kelly/modal/isOpen"] &&
        store.getters["kelly/modal/isSpeechConfirmationType"]
      );
    });
    const content = computed(() => store.getters["kelly/modal/content"]);

    return {
      isOpen,
      content,
      handle_close,
      handle_process,
    };

    function handle_close() {
      store.dispatch("kelly/brain/abort");
    }

    function handle_process() {
      store.dispatch("kelly/brain/interpret");
    }
  },
});
</script>

<style scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60vw;
  height: 60vh;

  border: 1px solid black;

  background-color: white;
  padding: 1rem;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
