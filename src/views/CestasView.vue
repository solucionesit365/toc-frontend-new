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
          v-if="row * 4 + col + 1 <= arrayCestas.length"
          @click="seleccionar(arrayCestas[row * 4 + col])"
          class="cesta mb-3 ms-2 me-1"
          :class="{
            cestaActiva: arrayCestas[row * 4 + col]._id === idCestaSeleccionada,
          }"
        >
          <MDBCardBody>
            <MDBCardTitle
              >{{ arrayCestas[row * 4 + col].modo }}
              <span
                v-if="
                  arrayMesas[row * 4 + col] &&
                  arrayCestas[row * 4 + col].indexMesa
                "
                >Mesa:
                {{
                  arrayMesas[arrayCestas[row * 4 + col].indexMesa].nombre
                }}</span
              ></MDBCardTitle
            >
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
          </MDBCardBody>
        </MDBCard>
      </template>
    </div>
  </div>

  <div v-if="vistaMesas" class="row sizeGeneral">
    <MesasComponent />
  </div>

  <div v-if="!vistaMesas" class="position-absolute bottom-0 start-0">
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
    <button
      @click="nuevaCesta()"
      class="btn btn-success ms-2"
      style="font-size: 27px"
    >
      CREAR CESTA
    </button>
    <button
      @click="borrarCesta()"
      class="btn btn-danger ms-2"
      style="font-size: 27px"
    >
      BORRAR CESTA
    </button>
  </div>
</template>

<script>
import { computed, ref, provide, onMounted } from "vue";
import { useStore } from "vuex";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-vue-ui-kit";
import router from "../router/index";
import axios from "axios";
import Swal from "sweetalert2";
import MesasComponent from "../components/mesas/MesasComponent.vue";
export default {
  name: "CestasView",
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MesasComponent,
  },
  setup() {
    const store = useStore();
    const vistaMesas = ref(store.getters["Configuracion/mesasActivas"]);
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayMesas = ref([]);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivoTrabajador = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const idCestaSeleccionada = ref(null);

    function switchMesas() {
      if (vistaMesas.value) {
        actualizarMesas();
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

    function nuevaCesta() {
      if (
        indexActivoTrabajador.value != undefined &&
        indexActivoTrabajador.value != null &&
        arrayTrabajadores.value
      ) {
        axios
          .post("cestas/crearCesta", {
            idTrabajador:
              arrayTrabajadores.value[indexActivoTrabajador.value]._id,
          })
          .then((resNuevaCesta) => {
            if (!resNuevaCesta.data) {
              throw Error("No se ha podido crear una nueva cesta");
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
          });
      }
    }

    function borrarCesta() {
      if (idCestaSeleccionada.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (arrayCestas.value[i]._id === idCestaSeleccionada.value) {
            if (
              arrayCestas.value[i].indexMesa != null &&
              arrayCestas.value[i].indexMesa != undefined
            ) {
              Swal.fire(
                "Oops...",
                "No puedes eliminar una cesta de tipo MESA",
                "error"
              );
              return false;
            }
          }
        }
        axios
          .post("cestas/fulminarCesta", {
            idCesta: idCestaSeleccionada.value,
          })
          .then((resBorrarCesta) => {
            if (!resBorrarCesta.data) {
              throw Error("No se ha podido borrar la cesta");
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
          });
      }
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
        idCestaSeleccionada.value = cesta._id;
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

    function actualizarMesas() {
      axios
        .get("mesas/getMesas")
        .then((resMesas) => {
          if (resMesas.data && resMesas.data.length === 50) {
            arrayMesas.value = resMesas.data;
          } else {
            throw Error("Error al obtener la configuración de mesas");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    provide("volver", volver);
    provide("switchMesas", switchMesas);

    onMounted(() => {
      idCestaSeleccionada.value =
        arrayTrabajadores.value[indexActivoTrabajador.value].idCesta;
      actualizarMesas();
    });
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
      nuevaCesta,
      borrarCesta,
      arrayMesas,
      idCestaSeleccionada,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCesta: 20rem;
$alturaCesta: 17rem;
$alturaSublista: 10rem;
$alturaGeneral: 43rem;
$anchoGeneral: 85rem;
.switchMesas {
  height: 2.5rem;
  width: calc(4rem + 0.75rem);
  border-radius: 5rem;
}
.cesta {
  min-width: $anchoCesta;
  max-width: $anchoCesta;
  max-height: $alturaCesta;
  min-height: $alturaCesta;
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
