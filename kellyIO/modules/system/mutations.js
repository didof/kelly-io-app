import { STATUS } from './shared'

export function setIdleStatus(state) {
  state.status = STATUS.IDLE;
}

export function setRecordingStatus(state) {
  state.status = STATUS.RECORDING;
}

export function setSpeakingStatus(state) {
  state.status = STATUS.SPEAKING;
}

