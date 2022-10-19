import axios from "axios";
import Swal from "sweetalert2";
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
    deleteIndexMutation(state, index) {
      for (let i = 0; i < state.arrayCestas.length; i++) {
        if (state.arrayCestas[i]._id === state.idCestaActiva) {
          state.arrayCestas[i].lista.splice(index, 1);
          axios
            .post("cestas/borrarItemCesta", {
              idCesta: state.arrayCestas[i]._id,
              index,
            })
            .then((resDelete) => {
              if (!resDelete.data) {
                throw Error("No se ha podido eliminar el artículo de la cesta");
              } else {
                state.indexItemActivo = null;
              }
            })
            .catch((err) => {
              Swal.fire("Oops...", err.message, "error");
            });
          break;
        }
      }
    },
    deleteListaMutation(state) {
      axios
        .post("cestas/borrarCesta", {
          idCesta: state.idCestaActiva,
        })
        .then((resDelete) => {
          if (!resDelete.data) {
            throw Error("No se ha podido borrar la lista");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
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
    deleteIndex({ commit }, index) {
      commit("deleteIndexMutation", index);
    },
    deleteLista({ commit }) {
      commit("deleteListaMutation");
    },
  },
};
