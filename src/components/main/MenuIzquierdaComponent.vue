<template>
  <div v-if="vistaCliente" class="divInfoModo mb-2">
    <div v-if="cesta" class="modoVenta">
      {{ cesta.modo }}<br />
      <span v-if="cesta">{{ cesta.nombreCliente }}</span>
      <span>Sin cliente asignado</span>
    </div>
  </div>
  <MDBBtnGroup v-if="!vistaCliente" class="shadow-0">
    <MDBBtn
      outline="secondary"
      class="botones"
      @click="goTo('/menu/caja/tickets')"
      ><MDBIcon icon="bars" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
      ><MDBIcon icon="search" size="4x"
    /></MDBBtn>
    <MDBBtn
      outline="secondary"
      class="botones ms-1"
      @click="refModalClientes.abrirModal()"
      ><MDBIcon icon="users" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
  <MDBBtnGroup v-if="!vistaCliente" class="shadow-0 mt-1">
    <MDBBtn outline="secondary" class="botones"
      ><MDBIcon icon="print" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
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
    <MDBBtn outline="secondary" class="botones ms-1"
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
</template>

<script>
import { computed, ref, watch } from "vue";
import { MDBBtnGroup, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import router from "../../router/index";
import ModalClientesComponent from "./ModalClientes.vue";
export default {
  name: "MenuIzquierdaComponent",
  components: {
    MDBBtnGroup,
    MDBBtn,
    MDBIcon,
    ModalClientesComponent,
  },
  setup() {
    const store = useStore();
    const refModalClientes = ref(null);
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
            arrayCestas.value[i]._id ==
            arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    const vistaCliente = computed(() => {
      if (cesta.value && cesta.value.idCliente) return true;
      return false;
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
      if (vistaCliente.value) {
        vistaCliente.value = false;
      } else {
        vistaCliente.value = true;
      }
    }

    function goTo(x) {
      router.push(x);
    }

    watch(cesta, () => {
      console.log("detecto cambio");
      if (cesta.value && cesta.value.idCliente) {
        vistaCliente.value = true;
        console.log("muhahhaha");
      }
    });

    watch(arrayTrabajadores, () => {
      console.log("detecto cambio");
      if (cesta.value && cesta.value.idCliente) {
        vistaCliente.value = true;
        console.log("muhahhaha");
      }
    });

    return {
      indexActivoCesta,
      borrarItem,
      borrarLista,
      vistaCliente,
      changeVistaCliente,
      cesta,
      goTo,
      refModalClientes,
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
  text-align: center;
}
</style>
