import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import state from "./state";

import events from "./events";
import gantt from "./gantt";
import tasks from "./tasks";
import notes from "./notes";
import stickyNotes from "./meeting minutes";
import comments from "./comments"
import project from "./project"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
      user: {
        loggedIn: false,
        data: null
      }
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        }
    },
    actions: {
        fetchUser({ commit }, user) {
            commit("SET_LOGGED_IN", user !== null);
            if (user) {
                commit("SET_USER", {
                    displayName: user.displayName,
                    email: user.email
                });
            } else {
                commit("SET_USER", null);
            }
        }
    },
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
