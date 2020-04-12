import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state";

import tasks from "./tasks";
import events from "./events";
import stickyNotes from "./sticky-note";
import notes from "./notes";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state,
    modules: {
        events,
        tasks,
        stickyNotes,
        notes
    }
})
