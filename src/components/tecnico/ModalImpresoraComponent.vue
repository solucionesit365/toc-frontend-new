<template>
  <MDBModal
    id="modalImpresora"
    tabindex="-1"
    labelledby="tituloModalImpresora"
    v-model="modalImpresora"
    staticBackdrop
    size="xl"
  >
    <MDBModalBody>
      <div class="row">
        <MDBSelect
          v-model:options="opciones"
          size="lg"
          label="Tipo impresora"
        />
      </div>

      <div v-if="selected === 'USB'" class="row mt-2">
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">VID</span>
          <input
            type="text"
            class="form-control form-control-lg"
            v-model="vid"
            placeholder="0x04B8"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon1">PID</span>
          <input
            type="text"
            class="form-control form-control-lg"
            v-model="pid"
            placeholder="0x0202"
          />
        </div>
      </div>

      <div class="row mt-2">
        <div class="d-inline-block text-end">
          <MDBBtn color="primary" size="lg" @click="guardar()">Guardar</MDBBtn>
          <MDBBtn
            color="danger"
            size="lg"
            class="mt-2"
            @click="modalImpresora = false"
            >Cancelar</MDBBtn
          >
        </div>
      </div>
    </MDBModalBody>
  </MDBModal>
</template>

<script>
import axios from "axios";
import { MDBModal, MDBModalBody, MDBBtn, MDBSelect } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import { ref, computed } from "vue";
export default {
  name: "ModalImpresoraComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
    MDBSelect,
  },
  setup(_props, { expose }) {
    const modalImpresora = ref(false);
    const vid = ref("");
    const pid = ref("");
    const opciones = ref([
      { text: "USB", value: "USB", selected: true },
      { text: "SERIE", value: "SERIE" },
      { text: "MQTT", value: "MQTT" },
    ]);
    const selected = computed(() => {
      if (opciones.value) {
        for (let i = 0; i < opciones.value.length; i++) {
          if (opciones.value[i]?.selected === true) {
            return opciones.value[i].value;
          }
        }
      }
      return "USB";
    });

    function abrirModal() {
      modalImpresora.value = true;
    }

    async function guardar() {
      try {
        switch (selected.value) {
          case "USB":
            if (vid.value != "" && pid.value != "") {
              const resUsb = await axios.post("parametros/setVidAndPid", {
                vid: vid.value,
                pid: pid.value,
              });
              if (resUsb.data) {
                Swal.fire(
                  "OK",
                  "Datos de la impresora USB guardados correctamente",
                  "success"
                );
                modalImpresora.value = false;
              } else
                throw Error(
                  "Error al guardar los parámetros de la impresora USB"
                );
            } else throw Error("El tipo USB necesita los valores VID y PID");
            break;
          default:
            if (selected.value === "SERIE" || selected.value === "MQTT") {
              const resTipo = await axios.post("parametros/setTipoImpresora", {
                tipo: selected.value,
              });
              if (resTipo.data) {
                Swal.fire(
                  "OK",
                  "Datos de la impresora USB guardados correctamente",
                  "success"
                );
                modalImpresora.value = false;
              } else {
                throw Error("No se ha podido guardar el tipo de impresora");
              }
            } else throw Error("Tipo de impresora desconocido");
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    expose({
      abrirModal,
    });

    return {
      modalImpresora,
      opciones,
      selected,
      vid,
      pid,
      guardar,
    };
  },
};
</script>

<style lang="scss" scoped></style>
