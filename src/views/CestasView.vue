<template>
  <div
    v-if="
      arrayTrabajadores &&
      indexActivoTrabajador != null &&
      indexActivoTrabajador != undefined
    "
    class="row mt-2"
  >
    <div class="col" v-for="(cesta, index) in arrayCestas" v-bind:key="index">
      <MDBCard
        class="cesta mb-3"
        :class="{
          cestaActiva:
            cesta._id === arrayTrabajadores[indexActivoTrabajador].idCesta,
        }"
      >
        <MDBCardBody>
          <MDBCardTitle>{{ cesta.modo }}</MDBCardTitle>
          <MDBCardText>
            <span style="font-size: 1.2rem"
              >Total: {{ getTotal(cesta).toFixed(2) }} €</span
            ></MDBCardText
          >
          <MDBBtn
            color="primary"
            size="lg"
            class="w-100"
            @click="seleccionar(cesta)"
            >Seleccionar</MDBBtn
          >
        </MDBCardBody>
      </MDBCard>
    </div>
  </div>
  <div class="input-group position-absolute bottom-0 start-0 mb-3 ms-2">
    <button
      @click="volver()"
      class="btn btn-warning ms-2"
      style="font-size: 27px"
    >
      VOLVER
    </button>
    <button
      @click="switchMesas()"
      class="btn btn-primary ms-2"
      style="font-size: 27px"
    >
      VISTA MESAS
    </button>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
import router from "../router/index";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "CestasView",
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const vistaMesas = ref(store.getters["Configuracion/mesasActivas"]);
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivoTrabajador = computed(
      () => store.state.Trabajadores.indexActivo
    );

    function switchMesas() {
      if (vistaMesas.value) {
        vistaMesas.value = false;
      } else {
        vistaMesas.value = true;
      }
    }

    function volver() {
      router.back();
    }

    function getTotal(cesta) {
      return (
        cesta.detalleIva.importe1 +
        cesta.detalleIva.importe2 +
        cesta.detalleIva.importe3
      );
    }

    function seleccionar(cesta) {
      if (
        arrayTrabajadores.value &&
        indexActivoTrabajador.value != undefined &&
        indexActivoTrabajador.value != null &&
        arrayTrabajadores.value[indexActivoTrabajador.value]
      ) {
        axios.post("cestas/cambiarCestaTrabajador", {
          idCesta: cesta._id,
          idTrabajador:
            arrayTrabajadores.value[indexActivoTrabajador.value]._id,
        });
      } else {
        Swal.fire(
          "Oops...",
          "Error, no se ha podido seleccionar la cesta para el trabajador",
          "error"
        );
      }
    }

    return {
      vistaMesas,
      switchMesas,
      arrayCestas,
      arrayTrabajadores,
      indexActivoTrabajador,
      volver,
      getTotal,
      seleccionar,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCesta: 20rem;
.switchMesas {
  height: 2.5rem;
  width: calc(4rem + 0.75rem);
  border-radius: 5rem;
}
.cesta {
  min-width: $anchoCesta;
  max-width: $anchoCesta;
}
.cestaActiva {
  background-color: rgb(255, 221, 176);
}
</style>
