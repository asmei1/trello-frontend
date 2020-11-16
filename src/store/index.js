import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import * as types from './mutation-types'

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        user: undefined,
        token: ""
    },
    getters: {
        isUserLogIn: (state) => {
            return state.user;
        },
        api: (endpoint)=>{
            return (process.env.NODE_ENV === 'development')
                ? "http://localhost:5000"
                : "https://trelloprojectapp.herokuapp.com" + endpoint;
        }
    },
    mutations: {
        // mutating your user state
        [types.USER_LOGIN](state, user) {
            state.user = user;
        },
        [types.USER_LOGOUT](state) {
            state.user = undefined;
            state.user = "";
        },
        [types.USER_TOKEN](state, token) {
            state.token = token
        }
    },
    actions: {},
})

export default store;