import { tocGame } from "../services/tocGame";

export default {
  namespaced: true,
  state: {
    parametros: null,
  },
  getters: {
    // suplementosActivos: (state) => state.suplementos,
    // mesasActivas: (state) => state.mesas,
    parametros: (state) => state.parametros,
  },
  mutations: {
    setParametrosMutation(state, payload) {
      state.parametros = payload;
    },
  },
  actions: {
    setParametros({ commit }, payload) {
      commit("setParametrosMutation", payload);
      tocGame.cargarConfiguracion();
    },
  },
};
