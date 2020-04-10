import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state";

import tasks from "./tasks";
import events from "./events";


Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state,
    modules: {
        events,
        tasks

    }
})
