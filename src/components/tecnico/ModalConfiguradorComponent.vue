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
          <div class="form-check form-switch mt-3">
            <input
              class="form-check-input"
              style="transform: scale(1.8)"
              type="checkbox"
              role="switch"
              v-model="prohibirSuplementos"
            />
            <label class="form-check-label ms-4 texto"
              >Prohibir suplementos</label
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
          <div class="form-check form-switch mt-3">
            <input
              class="form-check-input"
              style="transform: scale(1.8)"
              type="checkbox"
              role="switch"
              v-model="mesas"
            />
            <label class="form-check-label ms-4 texto">Utilizar mesas</label>
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

import { ref, onMounted, watch, nextTick } from "vue";
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
    const prohibirSuplementos = ref(false);
    const mesas = ref(true);

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
            prohibirSuplementos.value =
              resParams.data.prohibirSuplementos === "Si" ? true : false;
            mesas.value = resParams.data.mesas === "Si" ? true : false;
          } else {
            throw Error("No se han podido obtener los parámetros");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        })
        .finally(() => {
          watch(prohibirBuscarArticulos, (newValue, oldValue) => {
            axios
              .post("parametros/setPropiedad", {
                parametros: { prohibirBuscarArticulos: newValue ? "Si" : "No" },
              })
              .then((res) => {
                if (res.data) {
                  nextTick(() => {
                    prohibirBuscarArticulos.value = newValue;
                  });
                } else {
                  throw Error(
                    "No se ha podido actualizar el estado de prohibirBuscarArticulo"
                  );
                }
              })
              .catch((err) => {
                nextTick(() => {
                  prohibirBuscarArticulos.value = oldValue;
                });
                Swal.fire("Oops...", err.message, "error");
              });
          });

          watch(prohibirEntradas, (newValue, oldValue) => {
            axios
              .post("parametros/setPropiedad", {
                parametros: { prohibirEntradas: newValue ? "Si" : "No" },
              })
              .then((res) => {
                if (res.data) {
                  nextTick(() => {
                    prohibirEntradas.value = newValue;
                  });
                } else {
                  throw Error(
                    "No se ha podido actualizar el estado de prohibirEntradas"
                  );
                }
              })
              .catch((err) => {
                nextTick(() => {
                  prohibirEntradas.value = oldValue;
                });
                Swal.fire("Oops...", err.message, "error");
              });
          });

          watch(prohibirSuplementos, (newValue, oldValue) => {
            axios
              .post("parametros/setPropiedad", {
                parametros: { prohibirSuplementos: newValue ? "Si" : "No" },
              })
              .then((res) => {
                if (res.data) {
                  nextTick(() => {
                    prohibirSuplementos.value = newValue;
                  });
                } else {
                  throw Error(
                    "No se ha podido actualizar el estado de prohibirSuplementos"
                  );
                }
              })
              .catch((err) => {
                nextTick(() => {
                  prohibirSuplementos.value = oldValue;
                });
                Swal.fire("Oops...", err.message, "error");
              });
          });

          watch(mesas, (newValue, oldValue) => {
            axios
              .post("parametros/setPropiedad", {
                parametros: { mesas: newValue ? "Si" : "No" },
              })
              .then((res) => {
                if (res.data) {
                  nextTick(() => {
                    mesas.value = newValue;
                  });
                } else {
                  throw Error("No se ha podido actualizar el estado de mesas");
                }
              })
              .catch((err) => {
                nextTick(() => {
                  mesas.value = oldValue;
                });
                Swal.fire("Oops...", err.message, "error");
              });
          });
        });
    });

    return {
      modalConfigurador,
      prohibirBuscarArticulos,
      prohibirEntradas,
      prohibirSuplementos,
      mesas,
    };
  },
};
</script>

<style lang="scss" scoped>
.texto {
  font-size: 1.3rem;
}
</style>
