import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userConnected: false
    },
    mutations: {
        CONNECT_USER(state) {
            state.userConnected = true
        },
        DISCONNECT_USER(state) {
           state.userConnected = false
        }
    },
    actions: {},
    modules: {}
})
