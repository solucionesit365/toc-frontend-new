<template>
  <div
    v-if="
      !vistaMesas &&
      arrayTrabajadores &&
      arrayCestas &&
      indexActivoTrabajador != null &&
      indexActivoTrabajador != undefined
    "
    class="row mt-2 overflow-auto sizeGeneral"
  >
    <div class="row" v-for="(_lol, row) in totalRows" v-bind:key="row">
      <template v-for="(_lal, col) in 4" v-bind:key="col">
        <MDBCard
          v-if="row * 4 + col + 1 < arrayCestas.length"
          class="cesta mb-3 ms-2 me-1"
          :class="{
            cestaActiva:
              arrayCestas[row * 4 + col]._id ===
              arrayTrabajadores[indexActivoTrabajador].idCesta,
          }"
        >
          <MDBCardBody>
            <MDBCardTitle>{{ arrayCestas[row * 4 + col].modo }}</MDBCardTitle>
            <MDBCardText>
              <span style="font-size: 1.2rem"
                >Total:
                {{ getTotal(arrayCestas[row * 4 + col]).toFixed(2) }} €</span
              >
              <div class="overflow-auto text-truncate listaCesta">
                <ul class="list-group">
                  <li
                    v-for="(item, indexJ) in arrayCestas[row * 4 + col].lista"
                    v-bind:key="indexJ"
                    class="list-group-item"
                  >
                    <span
                      class="d-inline-block text-truncate"
                      style="max-width: 12rem"
                      >{{ item.nombre }}</span
                    >
                    <span class="ms-1" style="vertical-align: top"
                      >x{{ item.unidades }}</span
                    >
                  </li>
                </ul>
              </div></MDBCardText
            >
            <MDBBtn
              color="primary"
              size="lg"
              class="w-100"
              @click="seleccionar(arrayCestas[row * 4 + col])"
              >Seleccionar</MDBBtn
            >
          </MDBCardBody>
        </MDBCard>
      </template>
    </div>
  </div>
  <div class="input-group position-absolute bottom-0 start-0">
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

    const totalRows = computed(() => {
      const nCestas = arrayCestas.value.length;
      let nRows = Math.trunc(nCestas / 4);
      if (nCestas % 4 > 0) nRows += 1;
      return nRows;
    });

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
      totalRows,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCesta: 20rem;
$alturaSublista: 10rem;
$alturaGeneral: 43rem;
$anchoGeneral: 88rem;
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
.listaCesta {
  min-height: $alturaSublista;
  max-height: $alturaSublista;
}
.colJuntitas {
  padding: 3px 0px 3px 0px;
}
.sizeGeneral {
  min-height: $alturaGeneral;
  max-height: $alturaGeneral;
  min-width: $anchoGeneral;
  max-width: $anchoGeneral;
}
</style>
