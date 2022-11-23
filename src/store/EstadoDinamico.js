export default {
  namespaced: true,
  state: {
    vistaEspecial: false,
  },
  mutations: {
    setVistaClienteMutation(state, payload) {
      state.vistaEspecial = payload;
    },
    resetMutation(state) {
      state.vistaEspecial = false;
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
