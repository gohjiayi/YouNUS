import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state";

import events from "./events";
import gantt from "./gantt";
import tasks from "./tasks";
import notes from "./notes";
import stickyNotes from "./sticky-note";
import comments from "./comments"
import project from "./project"
 
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state,
    modules: {
        events,
        gantt,
        tasks,
        notes,
        stickyNotes,
        comments,
        project
    }
})
