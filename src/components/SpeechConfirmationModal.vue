<template>
  <teleport to="#app">
    <transition name="fade">
      <div v-if="isOpen">
        <div class="backdrop" @click="close"></div>
        <div class="modal">
          <h1>Confirmation</h1>
          <p>
            I got <i>{{ content }}</i>
          </p>
          <p>Is this right?</p>
          <div class="buttons">
            <button @click="confirm">Yes</button>
            <button @click="close">No</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed } from "vue";
import { defineKSpeechConfirmationModal } from "../../kellyIO";

export default defineKSpeechConfirmationModal({
  setup({ features }) {
    const { isOpen: isOpenFn, content: contentFn, close, confirm } = features;

    const isOpen = computed(() => isOpenFn());
    const content = computed(() => contentFn());

    return {
      isOpen,
      content,
      close,
      confirm,
    };
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
