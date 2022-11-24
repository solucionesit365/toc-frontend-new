import { createStore } from "vuex";
import Trabajadores from "./Trabajadores";
import Cestas from "./Cestas";
import Caja from "./Caja";
import Teclado from "./Teclado";
import Configuracion from "./Configuracion";
import Datafono from "./Datafono";
import EstadoDinamico from "./EstadoDinamico";
import Unidades from "./Unidades";

export default createStore({
  state: {
    vistaEspecial: false,
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
    Unidades,
  },
});
