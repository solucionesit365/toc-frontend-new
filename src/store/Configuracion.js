export default {
  namespaced: true,
  state: {
    suplementos: false,
  },
  getters: {
    suplementosActivos: (state) => state.suplementos,
  },
  mutations: {
    setSuplementosMutation(state, payload) {
      state.suplementos = payload;
    },
  },
  actions: {
    setSuplemetos({ commit }, payload) {
      commit("setSuplementosMutation", payload);
    },
  },
};
