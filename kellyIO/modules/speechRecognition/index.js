import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default {
    namespaced: true,
    state() {
        return {
            recognition: null,
            transcripts: []
        }
    },
    getters,
    mutations,
    actions,
}