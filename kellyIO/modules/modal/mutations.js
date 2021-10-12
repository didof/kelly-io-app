export function open(state) {
    state.isOpen = true
}

export function close(state) {
    state.isOpen = false
}

export function setType(state, { type }) {
    state.type = type
}

export function setContent(state, { content }) {
    state.content = content
}

export function reset(state) {
    state.type = ''
    state.content = ''
    state.isOpen = false
}