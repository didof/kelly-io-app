import crateKellyComponent from "./utils";

export default crateKellyComponent({
  name: "recorder",
  features: {
    start({ Kdispatch }) {
      Kdispatch("ears/startRecognition");
    },
    stop({ Kdispatch }) {
      Kdispatch("ears/stopRecognition");
    },
    isIdle({ Kgetters }) {
      return Kgetters["system/isIdle"];
    },
    isRecording({ Kgetters }) {
      return Kgetters["system/isRecording"];
    },
  },
});
