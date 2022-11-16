export default {
  namespaced: true,
  state: {
    estado: "",
  },
  mutations: {
    setEstadoMutation(state, payload) {
      state.estado = payload;
    },
  },
  actions: {
    setEstado({ commit }, payload) {
      commit("setEstadoMutation", payload);
    },
  },
};
