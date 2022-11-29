<template>
  <div class="table-responsive divCesta reverso" v-if="cesta && cesta.lista">
    <table class="table colorFuente">
      <tbody class="tableBody">
        <tr
          v-for="(item, index) of cesta.lista"
          :key="index"
          class="itemCesta"
          @click="clickItem(index)"
          v-bind:class="{
            estiloPromo: item.promocion,
            seleccionado: indexItemCestaActivo === index,
          }"
        >
          <td>
            <span
              class="d-inline-block text-truncate"
              style="max-width: 21rem; min-width: 21rem"
              >{{ item.nombre }}</span
            >
            <span class="xUnidades ms-2"> x{{ item.unidades }}</span>
          </td>
          <td>{{ item.subtotal.toFixed(2) }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Cesta no inicializada</MDBCardTitle>
        <MDBCardText>
          En este momento no hay ninguna cesta seleccionada para
          <span
            v-if="arrayTrabajadores && arrayTrabajadores[indexTrabajadorActivo]"
            class="fw-bold"
            >{{ arrayTrabajadores[indexTrabajadorActivo].nombre }}</span
          >
        </MDBCardText>
        <MDBBtn color="primary" @click="inicializarCesta()"
          >Crear nueva cesta</MDBBtn
        >
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script>
import { computed } from "vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "CestaComponent",
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const indexItemCestaActivo = computed(
      () => store.state.Cestas.indexItemActivo
    );
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const cesta = computed(() => {
      if (arrayCestas.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (
            arrayTrabajadores.value &&
            arrayTrabajadores.value[indexTrabajadorActivo.value] &&
            arrayCestas.value[i]._id ==
              arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    function inicializarCesta() {
      if (
        arrayTrabajadores.value &&
        indexTrabajadorActivo.value != undefined &&
        indexTrabajadorActivo.value != null &&
        arrayTrabajadores.value[indexTrabajadorActivo.value]
      ) {
        axios
          .post("cestas/crearCesta", {
            idTrabajador:
              arrayTrabajadores.value[indexTrabajadorActivo.value]._id,
          })
          .then((resCrearCesta) => {
            if (!resCrearCesta.data) {
              throw Error("No se ha podido inicializar la nueva cesta");
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
          });
      } else if (
        !arrayTrabajadores.value ||
        indexTrabajadorActivo.value == undefined ||
        indexTrabajadorActivo.value == null
      ) {
        Swal.fire(
          "Oops...",
          "Error, no hay trabajador activo. Es necesario fichar antes de realizar esta acción",
          "error"
        );
      } else {
        Swal.fire("Oops...", "Error desconocido #123", "error");
      }
    }

    function clickItem(index) {
      store.dispatch("Cestas/setActivoAction", index);
    }

    return {
      cesta,
      arrayTrabajadores,
      indexTrabajadorActivo,
      indexItemCestaActivo,
      clickItem,
      inicializarCesta,
    };
  },
};
</script>

<style lang="scss" scoped>
.seleccionado {
  background-color: rgb(255, 221, 176);
}
.colorFuente {
  color: #606060 !important;
}
.divCesta {
  background-color: white;
  height: 15.6rem !important;
}
.tableBody {
  font-size: 1.3rem;
}
.xUnidades {
  display: inline-block !important;
  vertical-align: top;
  font-weight: bold;
}
.itemCesta {
  line-height: 22px;
}
.reverso {
  display: flex;
  flex-direction: column-reverse;
}
</style>
