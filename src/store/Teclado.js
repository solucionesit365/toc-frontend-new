export default {
  namespaced: true,
  state: {
    objTeclado: [],
    indexMenuActivo: 0,
    indexSubmenuActivo: 0,
  },
  mutations: {
    setTecladoMutation(state, payload) {
      state.objTeclado = payload;
    },
    setIndexMenuActivoMutation(state, payload) {
      state.indexMenuActivo = payload;
      state.indexSubmenuActivo = 0;
    },
    setIndexSubmenuActivoMutation(state, payload) {
      state.indexSubmenuActivo = payload;
    },
  },
  getters: {
    getTeclado: (state) => state.objTeclado,
  },
  actions: {
    setTeclado({ commit }, payload) {
      commit("setTecladoMutation", payload);
    },
    setIndexMenuActivo({ commit }, payload) {
      commit("setIndexMenuActivoMutation", payload);
    },
    setIndexSubmenuActivo({ commit }, payload) {
      commit("setIndexSubmenuActivoMutation", payload);
    },
  },
};
