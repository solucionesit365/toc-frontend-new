export default {
  namespaced: true,
  state: {
    arrayCestas: [],
    idCestaActiva: null,
    indexItemActivo: null,
  },
  mutations: {
    setArrayCestasMutation(state, payload) {
      state.arrayCestas = payload;
    },
    setActivoMutation(state, payload) {
      state.indexItemActivo = payload;
    },
    setIdCestaActivaMutation(state, payload) {
      state.idCestaActiva = payload;
    },
  },
  getters: {
    getArrayCestas: (state) => state.arrayCestas,
    getIdCestaActiva: (state) => state.idCestaActiva,
  },
  actions: {
    setActivoAction({ commit }, activo) {
      commit("setActivoMutation", activo);
    },
    setArrayCestasAction({ commit }, payload) {
      if (payload.length > 0)
        commit("setIdCestaActivaMutation", payload[0]._id);
      commit("setArrayCestasMutation", payload);
    },
  },
};
