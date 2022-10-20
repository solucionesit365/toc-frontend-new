<template>
  <div v-if="vistaCliente" class="divInfoModo mb-2">
    <div v-if="cesta" class="modoVenta">
      {{ cesta.modo }}<br />Sin cliente asignado
    </div>
  </div>
  <MDBBtnGroup v-if="!vistaCliente" class="shadow-0">
    <MDBBtn outline="secondary" class="botones"
      ><MDBIcon icon="bars" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
      ><MDBIcon icon="search" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
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
</template>

<script>
import { computed, ref } from "vue";
import { MDBBtnGroup, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import router from "../../router/index";
export default {
  name: "MenuIzquierdaComponent",
  components: {
    MDBBtnGroup,
    MDBBtn,
    MDBIcon,
  },
  setup() {
    const store = useStore();
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivoCesta = computed(() => store.state.Cestas.indexItemActivo);
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const vistaCliente = ref(false);

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

    function borrarItem() {
      store.dispatch("Cestas/deleteIndex", indexActivoCesta.value);
    }

    function borrarLista() {
      store.dispatch("Cestas/deleteLista");
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

    return {
      indexActivoCesta,
      borrarItem,
      borrarLista,
      vistaCliente,
      changeVistaCliente,
      cesta,
      goTo,
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
