export default {
  namespaced: true,
  state: {
    cajaAbierta: false,
    arrayVentas: [],
  },
  mutations: {
    setArrayVentasMutation(state, payload) {
      state.arrayVentas = payload;
    },
  },
  getters: {},
  actions: {
    setArrayVentas({ commit }, payload) {
      commit("setArrayVentasMutation", payload);
    },
  },
};
