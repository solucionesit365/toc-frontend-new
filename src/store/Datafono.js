export default {
  namespaced: true,
  state: {
    enUso: true,
  },
  mutations: {
    setEnUsoMutation(state, payload) {
      state.enUso = payload;
    },
  },
  actions: {
    setEnUso({ commit }, payload) {
      commit("setEnUsoMutation", payload);
    },
  },
};
