import { createStore } from "vuex";
import Trabajadores from "./Trabajadores";
import Cestas from "./Cestas";
import Caja from "./Caja";
import Teclado from "./Teclado";
import Configuracion from "./Configuracion";
import Datafono from "./Datafono";
import EstadoDinamico from "./EstadoDinamico";

export default createStore({
  state: {
    vistaCliente: false,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    Caja,
    Cestas,
    Trabajadores,
    Teclado,
    Configuracion,
    Datafono,
    EstadoDinamico,
  },
});
