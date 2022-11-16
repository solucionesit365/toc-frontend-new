<template>
  <LateralComponent />
  <div class="margenLateral">
    <router-view />
  </div>
  <div class="position-absolute bottom-0 start-50 translate-middle-x mb-2">
    <div class="sizeTrabajadores">
      <div class="trabajadores">
        <MDBBtn
          v-for="(item, index) in arrayTrabajadores"
          v-bind:key="index"
          color="primary"
          rounded
          size="lg"
          @click="setIndexActivo(index)"
          >{{ item.nombre }}</MDBBtn
        >
      </div>

      <!-- <MDBBtn
          v-else
          outline="primary"
          rounded
          size="lg"
          class="d-inline-block"
          @click="setIndexActivo(index)"
          >{{ item.nombre }}</MDBBtn
        > -->
      <!-- <MDBBadge
        color="danger"
        class="translate-middle p-1 d-inline-block"
        pill
        notification
        >99+</MDBBadge
      > -->
    </div>
  </div>
</template>

<script>
import LateralComponent from "../components/menu/LateralComponent.vue";
import { MDBBtn } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "MenuPrincipalView",
  components: {
    LateralComponent,
    // MDBBadge,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivo = computed(() => store.state.Trabajadores.indexActivo);

    function setIndexActivo(index) {
      store.dispatch("Trabajadores/setIndexActivo", index);
    }

    return {
      arrayTrabajadores,
      setIndexActivo,
      indexActivo,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCajaTrabajadores: 300px;
$altoCajaTrabajadores: 4rem;
.margenLateral {
  margin-left: 11rem !important;
}
.sizeTrabajadores {
  width: 300px;
  max-height: $altoCajaTrabajadores;
  min-height: $altoCajaTrabajadores;
  overflow-x: scroll;
  display: block;
  background-color: red;
}

.trabajadores {
  display: inline-block;
  width: 100px;
}
</style>
