import axios from "axios";
import Swal from "sweetalert2";
export default {
  namespaced: true,
  state: {
    arrayCestas: [],
    indexItemActivo: null,
  },
  mutations: {
    setArrayCestasMutation(state, payload) {
      state.arrayCestas = payload;
    },
    setActivoMutation(state, payload) {
      state.indexItemActivo = payload;
    },

    deleteIndexMutation(state, { index, idCesta }) {
      axios
        .post("cestas/borrarItemCesta", {
          idCesta,
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
    },
    deleteListaMutation(_state, idCesta) {
      axios
        .post("cestas/borrarCesta", {
          idCesta: idCesta,
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
    async setClienteMutation(state, { index, idCliente, nombreCliente }) {
      state.arrayCestas[index].idCliente = idCliente;
      state.arrayCestas[index].nombreCliente = nombreCliente;
      await sincronizarCestaInverso(state.arrayCestas[index]);
    },
    async setModoMutation(state, { modo, index }) {
      state.arrayCestas[index].modo = modo;
      await sincronizarCestaInverso(state.arrayCestas[index]);
    },
  },
  getters: {
    getArrayCestas: (state) => state.arrayCestas,
  },
  actions: {
    setActivoAction({ commit }, activo) {
      commit("setActivoMutation", activo);
    },
    setArrayCestasAction({ commit }, payload) {
      commit("setArrayCestasMutation", payload);
    },
    deleteIndex({ commit }, { index, idCesta }) {
      commit("deleteIndexMutation", { index, idCesta });
    },
    deleteLista({ commit }, idCesta) {
      commit("deleteListaMutation", idCesta);
    },
    setClienteCesta({ commit }, payload) {
      commit("setClienteMutation", payload);
    },
    setModoCesta({ commit }, payload) {
      commit("setModoMutation", payload);
    },
  },
};

async function sincronizarCestaInverso(cesta) {
  try {
    const res = await axios.post("cestas/updateCestaInverso", {
      cesta,
    });

    if (!res.data) {
      throw Error("No se ha podido actualizar la cesta en el servidor");
    }
  } catch (err) {
    Swal.fire("Oops...", err.message, "error");
  }
}
