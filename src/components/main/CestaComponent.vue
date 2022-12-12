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
            sePuedeRegalar: sePuedeRegalar(item),
            regalado: item.regalo,
          }"
        >
          <td>
            <span
              class="d-inline-block text-truncate"
              style="max-width: 21rem; min-width: 21rem"
              >{{ item.nombre }}</span
            >
            <span class="xUnidades ms-2 d-inline"> x{{ item.unidades }}</span>
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
import { computed, onMounted, ref } from "vue";
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
  setup(_props, { expose }) {
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

    const puntos = ref(0);

    function actualizarPuntos() {
      if (cesta.value?.idCliente) {
        axios
          .post("clientes/consultarPuntos", {
            idCliente: cesta.value?.idCliente,
          })
          .then((res) => {
            if (typeof res.data === "number") {
              puntos.value = res.data;
            } else {
              puntos.value = 0;
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
            puntos.value = 0;
          });
      } else {
        puntos.value = 0;
      }
    }

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

    function pointsToEuros(points) {
      return Math.trunc(points * 0.03 * 0.02);
    }

    function sePuedeRegalar(itemCesta) {
      const arrayRegalables = [8641, 8654, 8640, 8675, 99, 315, 314, 312, 5603];
      if (
        cesta.value.idCliente == null ||
        cesta.value.idCliente == undefined ||
        cesta.value.idCliente == ""
      ) {
        return false;
      }

      for (let i = 0; i < arrayRegalables.length; i++) {
        if (arrayRegalables[i] === itemCesta.idArticulo) {
          if (
            pointsToEuros(puntos.value) >= itemCesta.subtotal &&
            !itemCesta.regalo
          ) {
            return true;
          }
        }
      }

      return false;
    }

    function regalar(indexLista) {
      axios
        .post("cestas/regalarProducto", {
          idCesta: cesta.value._id,
          indexLista,
        })
        .then((res) => {
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "¡Regalo aplicado!",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire(
              "Oops...",
              "No se ha podido regalar el producto",
              "error"
            );
          }
        });
    }

    function clickItem(index) {
      if (sePuedeRegalar(cesta.value.lista[index])) {
        Swal.fire({
          title: "¿Regalar este artículo?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Sí, regalar",
          denyButtonText: "No",
          icon: "question",
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            regalar(index);
          } else if (result.isDenied) {
            store.dispatch("Cestas/setActivoAction", index);
          }
        });
      } else {
        store.dispatch("Cestas/setActivoAction", index);
      }
    }

    // function reloadComponent() {
    //   const instance = getCurrentInstance();
    //   instance.proxy.$forceUpdate();
    // }

    expose({
      actualizarPuntos,
      // reloadComponent,
    });

    onMounted(() => {
      actualizarPuntos();
    });

    return {
      cesta,
      arrayTrabajadores,
      indexTrabajadorActivo,
      indexItemCestaActivo,
      clickItem,
      inicializarCesta,
      sePuedeRegalar,
      puntos,
    };
  },
};
</script>

<style lang="scss" scoped>
.seleccionado {
  background-color: rgb(255, 221, 176) !important;
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
.sePuedeRegalar {
  background-color: #ffc5c5;
}

.regalado {
  background-color: #d5ffbe;
}
</style>
