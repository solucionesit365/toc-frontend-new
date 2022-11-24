export default {
  namespaced: true,
  state: {
    unidades: 1,
  },
  mutations: {
    setUnidadesMutation(state, payload) {
      state.unidades = payload;
    },
  },
  getters: {
    getUnidades: (state) => state.unidades,
  },
  actions: {
    setUnidades({ commit }, payload) {
      commit("setUnidadesMutation", payload);
    },
  },
};
