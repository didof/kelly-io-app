import crateKellyComponent from "./utils";

export default crateKellyComponent(start, stop, isIdle, isRecording);
function start({ Kdispatch }) {
  Kdispatch("ears/startRecognition");
}
function stop({ Kdispatch }) {
  Kdispatch("ears/stopRecognition");
}
function isIdle({ Kgetters }) {
  return Kgetters["system/isIdle"];
}
function isRecording({ Kgetters }) {
  return Kgetters["system/isRecording"];
}
