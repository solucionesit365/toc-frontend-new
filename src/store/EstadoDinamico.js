export default {
  namespaced: true,
  state: {
    vistaCliente: false,
  },
  mutations: {
    setVistaClienteMutation(state, payload) {
      state.vistaCliente = payload;
    },
    resetMutation(state) {
      state.vistaCliente = false;
    },
  },
  getters: {},
  actions: {
    setVistaCliente({ commit }, payload) {
      commit("setVistaClienteMutation", payload);
    },
    reset({ commit }) {
      commit("resetMutation");
    },
  },
};
