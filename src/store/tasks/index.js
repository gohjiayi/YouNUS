import state from "./taskState";
import getters from "./taskGetters";
import mutations from "./taskMutation";
import actions from "./taskActions";

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
