import { createStore } from "vuex";
import Trabajadores from "./Trabajadores";
import Cestas from "./Cestas";
import Caja from "./Caja";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Caja,
    Cestas,
    Trabajadores,
  },
});
