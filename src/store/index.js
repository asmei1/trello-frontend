import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as types from './mutation-types'

Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: {},
        token: {}
    },
    getters: {
        //...other getters...
    },
    mutations: {
        // mutating your user state
        [types.USER_LOGIN](state, user) {
            state.user = user
        },
        [types.USER_LOGOUT](state) {
            state.user = {}
        },
        [types.USER_TOKEN](state, token) {
            state.token = token
        }
    },
    actions: {
    },
})