import state from "./projectsState";
import getters from "./projectsGetters";
import mutations from "./projectsMutations";
import actions from "./projectsActions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}