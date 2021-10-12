import { INITIAL_STATUS } from './shared';
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

export default {
    namespaced: true,
    state() {
        return {
            status: INITIAL_STATUS
        }
    },
    getters,
    mutations,
    actions,
}