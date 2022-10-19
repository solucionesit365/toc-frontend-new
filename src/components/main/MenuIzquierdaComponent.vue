<template>
  <MDBBtnGroup class="shadow-0">
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
  <MDBBtnGroup class="shadow-0 mt-1">
    <MDBBtn
      v-if="!indexActivoCesta && indexActivoCesta != 0"
      outline="secondary"
      class="botones"
      @click="borrarLista()"
      ><MDBIcon icon="trash" size="4x"
    /></MDBBtn>
    <MDBBtn v-else outline="secondary" class="botones" @click="borrarItem()"
      ><MDBIcon icon="times" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
      ><MDBIcon icon="calculator" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
      ><MDBIcon icon="shopping-cart" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
  <MDBBtnGroup class="shadow-0 mt-1">
    <MDBBtn outline="secondary" class="botones"
      ><MDBIcon icon="print" size="4x"
    /></MDBBtn>
    <MDBBtn outline="secondary" class="botones ms-1"
      ><MDBIcon icon="undo" size="4x"
    /></MDBBtn>
    <MDBBtn
      v-if="!indexActivoCesta && indexActivoCesta != 0"
      outline="secondary"
      class="botones ms-1"
      ><MDBIcon icon="info" size="4x"
    /></MDBBtn>
    <MDBBtn v-else outline="secondary" class="botones ms-1"
      ><MDBIcon icon="gift" size="4x"
    /></MDBBtn>
  </MDBBtnGroup>
</template>

<script>
import { computed } from "vue";
import { MDBBtnGroup, MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
export default {
  name: "MenuIzquierdaComponent",
  components: {
    MDBBtnGroup,
    MDBBtn,
    MDBIcon,
  },
  setup() {
    const store = useStore();
    const indexActivoCesta = computed(() => store.state.Cestas.indexItemActivo);

    function borrarItem() {
      store.dispatch("Cestas/deleteIndex", indexActivoCesta.value);
    }

    function borrarLista() {
      store.dispatch("Cestas/deleteLista");
    }

    return {
      indexActivoCesta,
      borrarItem,
      borrarLista,
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
</style>
