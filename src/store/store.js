import Vue from 'vue'
import Vuex from 'vuex'

import state from "./state";

import events from "./events";




Vue.use(Vuex)



export default new Vuex.Store({
    state,
    modules: {
        events
    }
})