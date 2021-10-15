import crateKellyComponent from "./utils";

export default crateKellyComponent({
  name: "speech-confirmation-modal",
  features: {
    isOpen({ Kgetters }) {
      return (
        Kgetters["modal/isOpen"] && Kgetters["modal/isSpeechConfirmationType"]
      );
    },
    content({ Kgetters }) {
      return Kgetters["modal/content"];
    },
    close({ Kdispatch }) {
      Kdispatch("brain/abort");
    },
    confirm({ Kdispatch }) {
      Kdispatch("brain/confirm");
    },
  },
});
