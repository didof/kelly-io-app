export function open({ commit }) {
    commit('open')
}

export function close({ commit }) {
    commit('close')
}

export function setType({ commit }, payload) {
    commit('setType', payload)
}

export function setContent({ commit }, payload) {
    commit('setContent', payload)
}

export function reset({ commit }) {
    commit('reset')
}