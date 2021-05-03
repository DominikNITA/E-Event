import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        authToken: null,
        user: null,
    },
    getters: {},
    mutations: {
        setAuthToken(state, newAuthToken) {
            state.authToken = newAuthToken;
        },
        setUser(state, newUser) {
            state.user = newUser;
        },
    },
    actions: {},
    modules: {},
});
