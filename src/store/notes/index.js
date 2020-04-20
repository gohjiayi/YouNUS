import state from "./notesState";
import getters from "./notesGetters";
import mutations from "./notesMutations";
import actions from "./notesActions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}