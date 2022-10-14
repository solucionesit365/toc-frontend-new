export default {
  namespaced: true,
  state: {
    objTeclado: [],
  },
  mutations: {
    setTecladoMutation(state, payload) {
      state.objTeclado = payload;
    },
  },
  getters: {
    getTeclado: (state) => state.objTeclado,
  },
  actions: {
    setTeclado({ commit }, payload) {
      commit("setTecladoMutation", payload);
    },
  },
};
