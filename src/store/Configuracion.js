export default {
  namespaced: true,
  state: {
    suplementos: false,
    mesas: false,
  },
  getters: {
    suplementosActivos: (state) => state.suplementos,
    mesasActivas: (state) => state.mesas,
  },
  mutations: {
    setSuplementosMutation(state, payload) {
      state.suplementos = payload;
    },
    setMesasMutation(state, payload) {
      state.mesas = payload;
    },
  },
  actions: {
    setSuplemetos({ commit }, payload) {
      commit("setSuplementosMutation", payload);
    },
    setMesas({ commit }, payload) {
      commit("setMesasMutation", payload);
    },
  },
};
