<template>
  <MDBModal
    id="modalConfigurador"
    tabindex="-1"
    labelledby="tituloModalConfigurador"
    v-model="modalConfigurador"
    staticBackdrop
    size="xl"
  >
    <MDBModalBody>
      <div class="row">
        <div class="col">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              style="transform: scale(1.8)"
              type="checkbox"
              role="switch"
              v-model="prohibirBuscarArticulos"
            />
            <label class="form-check-label ms-4 texto"
              >Prohibir buscar artículos</label
            >
          </div>
        </div>
        <div class="col">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              style="transform: scale(1.8)"
              type="checkbox"
              role="switch"
              v-model="prohibirEntradas"
            />
            <label class="form-check-label ms-4 texto"
              >Prohibir entradas de dinero</label
            >
          </div>
        </div>
      </div>

      <div class="row mt-2">
        <div class="d-inline-block text-end">
          <MDBBtn
            color="danger"
            size="lg"
            class="mt-2"
            @click="modalConfigurador = false"
            >Cerrar</MDBBtn
          >
        </div>
      </div>
    </MDBModalBody>
  </MDBModal>
</template>

<script>
import axios from "axios";
import { MDBModal, MDBModalBody, MDBBtn } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";

import { ref, onMounted, watch } from "vue";
export default {
  name: "ConfiguradorComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const modalConfigurador = ref(false);
    const prohibirBuscarArticulos = ref(false);
    const prohibirEntradas = ref(false);

    function abrirModal() {
      modalConfigurador.value = true;
    }

    expose({
      abrirModal,
    });

    onMounted(() => {
      axios
        .post("parametros/getParametros")
        .then((resParams) => {
          if (resParams.data) {
            prohibirBuscarArticulos.value =
              resParams.data.prohibirBuscarArticulos === "Si" ? true : false;
            prohibirEntradas.value =
              resParams.data.prohibirEntradas === "Si" ? true : false;
          } else {
            throw Error("No se han podido obtener los parámetros");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        })
        .finally(() => {
          watch(prohibirBuscarArticulos, (newValue, oldValue) => {
            console.log("nuevo: ", newValue);
            console.log("viejo: ", oldValue);
          });
          watch(prohibirEntradas, (newValue, oldValue) => {
            console.log("nuevo: ", newValue);
            console.log("viejo: ", oldValue);
          });
        });
    });

    return {
      modalConfigurador,
      prohibirBuscarArticulos,
      prohibirEntradas,
    };
  },
};
</script>

<style lang="scss" scoped>
.texto {
  font-size: 1.3rem;
}
</style>
