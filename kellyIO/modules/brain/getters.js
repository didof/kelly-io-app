import { TYPES } from "./shared";

export const confidenceThreshold = ({ confidenceThreshold }) =>
  confidenceThreshold;

export const skills = ({ skills }) => skills;
export const skillsNameList = ({ skills }) => skills.map(({ name }) => name);
export const skillsAmount = ({ skills }) => skills.length

export const activeSkill = ({ activeSkill }) => activeSkill;

export const queue = ({ queue }) => queue;
export const index = ({ index }) => index;

export const noActiveSkill = ({ activeSkill }) => activeSkill == null;

export const input = ({ queue }) => queue[queue.length - 1];

export const isSpeechConfirmationType = ({ type }) =>
  type === TYPES.SPEECH_RECOGNITION;
