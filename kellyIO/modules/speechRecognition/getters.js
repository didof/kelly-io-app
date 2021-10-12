export const lastTranscript = ({ transcripts }) =>
  transcripts[transcripts.length - 1];

export const hasBeenInitializated = ({ recognition }) => recognition !== null;
