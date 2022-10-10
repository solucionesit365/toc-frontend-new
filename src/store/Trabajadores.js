export default {
  namespaced: true,
  state: {
    arrayTrabajadores: [],
    indexActivo: null,
  },
  mutations: {
    setArrayTrabajadoresMutation(state, payload) {
      state.arrayTrabajadores = payload;
    },
    setIndexActivoMutation(state, payload) {
      state.indexActivo = payload;
    },
  },
  getters: {
    getArrayTrabajadores: (state) => state.arrayTrabajadores,
    getIndexActivo: (state) => state.trabajadorActivo,
    getTrabajadorActivo: (state) => state.arrayTrabajadores[state.indexActivo],
  },
  actions: {
    setArrayTrabajadores({ commit }, data) {
      commit("setArrayTrabajadoresMutation", data);
    },
    setIndexActivo({ commit }, data) {
      commit("setIndexActivoMutation", data);
    },
  },
};
