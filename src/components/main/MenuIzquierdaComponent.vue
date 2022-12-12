<template>
  <div
    v-if="vistaEspecial && cesta"
    class="divInfoModo mb-2"
    :class="{
      fondoDevolucion: cesta.modo == 'DEVOLUCION',
      fondoCliente: cesta.idCliente,
    }"
  >
    <div>
      <span class="modoVenta d-block text-center">{{ cesta.modo }}</span>
      <div
        v-if="cesta.idCliente"
        class="d-block textoNombreCliente text-center"
      >
        <span class="text-truncate" style="max-width: 10rem">{{
          cesta.nombreCliente
        }}</span>
        <MDBBtn
          @click="consultarPuntos(cesta.idCliente)"
          class="d-block mx-auto w-100"
          size="lg"
          color="primary"
          >Consultar puntos</MDBBtn
        >
      </div>

      <span v-else class="d-block text-center textoNombreCliente"
        >Sin cliente asignado</span
      >
    </div>
  </div>
  <MDBBtnGroup v-if="!vistaEspecial" class="shadow-0">
    <MDBBtn
      outline="secondary"
      class="botones"
      @click="goTo('/menu/caja/tickets')"
      ><MDBIcon icon="bars" size="4x"
    /></MDBBtn>
    <MDBBtn
      @click="refModalArticulos.abrirModal()"
      outline="secondary"
      class="botones ms-1"
      ><MDBIcon icon="search" size="4x"
    /></MDBBtn>
    <MDBBtn
      outline="secondary"
      class="botones ms-1"
      @click="refModalClientes.abrirModal()"
      ><MDBIcon icon="users" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
  <MDBBtnGroup v-if="!vistaEspecial" class="shadow-0 mt-1">
    <MDBBtn outline="secondary" class="botones"
      ><MDBIcon icon="print" size="4x"
    /></MDBBtn>
    <MDBBtn
      @click="refModalUnidades.abrirModal()"
      outline="secondary"
      class="botones ms-1"
      ><MDBIcon icon="calculator" size="4x"
    /></MDBBtn>
    <MDBBtn @click="goTo('/cestas')" outline="secondary" class="botones ms-1"
      ><MDBIcon icon="shopping-cart" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
  <MDBBtnGroup class="shadow-0 mt-1">
    <MDBBtn
      v-if="indexActivoCesta == undefined || indexActivoCesta == null"
      outline="secondary"
      class="botones"
      @click="borrarLista()"
      ><MDBIcon icon="trash" size="4x"
    /></MDBBtn>
    <MDBBtn v-else outline="secondary" class="botones" @click="borrarItem()"
      ><MDBIcon icon="times" size="4x"
    /></MDBBtn>
    <MDBBtn @click="resetGeneral()" outline="secondary" class="botones ms-1"
      ><MDBIcon icon="undo" size="4x"
    /></MDBBtn>
    <MDBBtn
      outline="secondary"
      @click="changeVistaCliente()"
      class="botones ms-1"
      ><MDBIcon icon="star" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
  <ModalClientesComponent ref="refModalClientes" />
  <ModalArticulosComponent ref="refModalArticulos" />
  <ModalUnidadesComponent ref="refModalUnidades" />
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { MDBBtnGroup, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import router from "../../router/index";
import ModalClientesComponent from "./ModalClientes.vue";
import ModalArticulosComponent from "./ModalArticulos.vue";
import ModalUnidadesComponent from "./UnidadesComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "MenuIzquierdaComponent",
  components: {
    MDBBtnGroup,
    MDBBtn,
    MDBIcon,
    ModalClientesComponent,
    ModalArticulosComponent,
    ModalUnidadesComponent,
  },
  setup(_props, { expose }) {
    const store = useStore();
    const refModalClientes = ref(null);
    const refModalArticulos = ref(null);
    const refModalUnidades = ref(null);
    const vistaEspecial = computed(
      () => store.state.EstadoDinamico.vistaEspecial
    );
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivoCesta = computed(() => store.state.Cestas.indexItemActivo);
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

    function borrarItem() {
      if (
        indexActivoCesta.value != null &&
        indexActivoCesta.value != undefined &&
        cesta.value
      )
        store.dispatch("Cestas/deleteIndex", {
          index: indexActivoCesta.value,
          idCesta: cesta.value._id,
        });
    }

    function borrarLista() {
      if (cesta.value) store.dispatch("Cestas/deleteLista", cesta.value._id);
    }

    function changeVistaCliente() {
      if (vistaEspecial.value) {
        store.dispatch("EstadoDinamico/setVistaCliente", false);
      } else {
        store.dispatch("EstadoDinamico/setVistaCliente", true);
      }
    }

    function goTo(x) {
      router.push(x);
    }

    function consultarPuntos(idCliente) {
      axios
        .post("clientes/consultarPuntos", { idCliente })
        .then((res) => {
          if (typeof res.data === "number") {
            Swal.fire(`Puntos: ${res.data}`, "", "info");
          } else {
            throw Error("No se ha podido obtener la información del cliente");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    async function resetGeneral() {
      if (arrayCestas.value && cesta.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (arrayCestas.value[i]._id === cesta.value._id) {
            store.dispatch("Unidades/setUnidades", 1);
            await store.dispatch("Cestas/setModoCesta", {
              index: i,
              modo: "VENTA",
            });
            store.dispatch("Cestas/setClienteCesta", {
              index: i,
              idCliente: null,
              nombreCliente: null,
            });
            store.dispatch("EstadoDinamico/reset");

            break;
          }
        }
      }
    }

    expose({
      resetGeneral,
    });

    onMounted(() => {
      if (
        cesta.value &&
        (cesta.value.idCliente || cesta.value.modo != "VENTA")
      ) {
        store.dispatch("EstadoDinamico/setVistaCliente", true);
      }
    });

    return {
      indexActivoCesta,
      borrarItem,
      borrarLista,
      vistaEspecial,
      changeVistaCliente,
      cesta,
      goTo,
      refModalClientes,
      refModalArticulos,
      refModalUnidades,
      resetGeneral,
      consultarPuntos,
    };
  },
};
</script>

<style lang="scss" scoped>
$sizeWidth: 6.8rem;
$sizeHeight: 5rem;
.botones {
  min-width: $sizeWidth;
  max-width: $sizeWidth;
  min-height: $sizeHeight;
  max-height: $sizeHeight;
}
.divInfoModo {
  max-width: 20.82rem;
  min-width: 20.82rem;
  max-height: 9.77rem;
  min-height: 9.77rem;
}

.modoVenta {
  font-size: 2rem;
  font-weight: bold;
}
.textoNombreCliente {
  font-size: 1rem;
}
.fondoDevolucion {
  background-color: #ffb5b5 !important;
}
.fondoCliente {
  background-color: #caffcc;
}
</style>
