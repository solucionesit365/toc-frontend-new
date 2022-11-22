<template>
  <MDBModal
    id="modalFichajes"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="modalFichajes"
    size="xl"
    modalFichajes
  >
    <MDBModalHeader>
      <MDBModalTitle id="staticBackdropLabel"> Fichar </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="row">
        <input
          class="form-control inputBusqueda w-100"
          type="text"
          placeholder="Buscar por nombre"
          aria-label=".form-control-lg example"
          v-model="inputBusqueda"
        />
      </div>
      <div
        v-if="arrayTrabajadores && arrayTrabajadores.length > 0"
        class="row mt-2"
      >
        <table class="table table-striped">
          <tbody>
            <tr
              v-for="(trabajador, index) of arrayTrabajadores"
              v-bind:key="index"
            >
              <td>
                <span class="textoNombre d-inline-block text-truncate">{{
                  trabajador.nombre
                }}</span>
              </td>
              <td>
                <MDBBtn
                  color="primary"
                  size="lg"
                  @click="fichar(trabajador._id)"
                  class="w-100"
                  style="height: 3.85rem; font-size: 1.5rem"
                  >Fichar</MDBBtn
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="row">
        <div class="sinResultados position-relative">
          <span
            class="textoSinResultados position-absolute top-50 start-50 translate-middle"
            >Sin resultados</span
          >
        </div>
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="primary" size="lg" @click="modalFichajes = false">
        Cerrar
      </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-vue-ui-kit";
import { ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { tocGame } from "../../../services/tocGame";

export default {
  name: "FichajesModal",
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  },
  setup() {
    const modalFichajes = ref(null);
    const arrayTrabajadores = ref([]);
    const inputBusqueda = ref("");

    function abrirModal() {
      modalFichajes.value = true;
    }

    function buscar() {
      axios
        .post("trabajadores/buscar", { busqueda: inputBusqueda.value })
        .then((res) => {
          arrayTrabajadores.value = res.data;
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function fichar(idTrabajador) {
      axios
        .post("trabajadores/fichar", {
          idTrabajador: idTrabajador,
        })
        .then((res) => {
          if (res.data) {
            tocGame.cargarTrabajadoresFichados();
            modalFichajes.value = false;
          } else {
            throw Error("Error, no se ha podido fichar");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    watch(inputBusqueda, () => {
      buscar();
    });

    return {
      modalFichajes,
      abrirModal,
      arrayTrabajadores,
      inputBusqueda,
      fichar,
    };
  },
};
</script>

<style lang="scss" scoped>
$sizeFuenteResultados: 2rem;
$sizeFuenteBusqueda: 2rem;
.textoNombre {
  font-size: $sizeFuenteResultados;
  max-width: 42rem;
}
.textoSinResultados {
  font-size: 3rem;
  font-weight: bold;
}
.sinResultados {
  height: 20rem;
}
.inputBusqueda {
  font-size: $sizeFuenteBusqueda;
}
</style>
