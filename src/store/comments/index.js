import state from "./commentsState";
import getters from "./commentsGetters";
import mutations from "./commentsMutations";
import actions from "./commentsActions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}