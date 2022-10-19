export default {
  namespaced: true,
  state: {
    enUso: false,
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
