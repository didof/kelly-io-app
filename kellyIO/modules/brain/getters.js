import { TYPES } from "./shared";

export function isSpeechConfirmationType({ type }) {
  return type === TYPES.SPEECH_RECOGNITION;
}

export function skills({ skills }) {
  return skills;
}

export function input({ input }) {
  return input;
}
