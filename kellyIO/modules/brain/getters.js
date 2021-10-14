import { TYPES } from "./shared";

export const confidenceThreshold = ({ confidenceThreshold }) =>
  confidenceThreshold;

export const skillsNameList = ({ commands }) => Array.from(commands.keys());

export const queue = ({ queue }) => queue;
export const index = ({ index }) => index;

export const input = ({ queue }) => queue[queue.length - 1].line;

export const isSpeechConfirmationType = ({ type }) =>
  type === TYPES.SPEECH_RECOGNITION;

export const engagedWith = ({ engagedWith }) => engagedWith;
export const commands = ({ commands }) => commands;
export const helps = ({ helps }) => helps;
export const execs = ({ execs }) => execs;
export const scripts = ({ scripts }) => scripts;
