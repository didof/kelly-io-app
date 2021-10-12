import { STATUS } from './shared'

export const isIdle = ({ status }) => status === STATUS.IDLE;

export const isRecording = ({ status }) => status === STATUS.RECORDING;

export const isSpeaking = ({ status }) => status === STATUS.SPEAKING;