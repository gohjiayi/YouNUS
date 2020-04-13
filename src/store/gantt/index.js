import state from "./ganttState";
import getters from "./ganttGetters";
import mutations from "./ganttMutations";
import actions from "./ganttActions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}