import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

import { TYPES } from './shared'

export default {
    namespaced: true,
    state() {
        return {
            type: TYPES.UNDEFINED,
            isOpen: false,
            content: ''
        }
    },
    getters,
    mutations,
    actions,
}