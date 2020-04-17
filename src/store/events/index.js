import state from "./eventsState"
import getters from "./eventsGetters"
import mutations from "./eventsMutations"
import actions from "./eventsActions"

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}