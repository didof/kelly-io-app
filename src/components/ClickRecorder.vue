<template>
  <button @click="start" :disabled="isStartDisabled">start</button>
  <button @click="stop" :disabled="isStopDisabled">stop</button>
</template>

<script>
import { computed } from "vue";
import { defineKRecorder } from "../../kellyIO";

export default defineKRecorder({
  setup({ start, stop, isIdle, isRecording }) {
    const isStartDisabled = computed(() => !isIdle());
    const isStopDisabled = computed(() => !isRecording());

    return {
      start,
      stop,
      isStartDisabled,
      isStopDisabled,
    };
  },
});
</script>
