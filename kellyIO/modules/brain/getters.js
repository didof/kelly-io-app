import { TYPES } from './shared'

export function isOpen({ isOpen }) {
    return isOpen
}

export function isClosed({ isOpen }) {
    return !isOpen
}

export function content({ content }) {
    return content
}

export function isSpeechConfirmationType({ type }) {
    return type === TYPES.SPEECH_RECOGNITION
}