<template>
  <!-- Sidenav-->
  <MDBSideNav
    v-model="sidenavPositions"
    id="sidenavPositions"
    :mode="mode"
    :slim="true"
    :backdrop="false"
  >
    <MDBSideNavMenu class="mx-auto text-center">
      <MDBSideNavItem @click="goTo('/main')">
        <MDBIcon icon="money-bill-alt" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/caja'),
        }"
        @click="goTo('/menu/caja')"
      >
        <MDBIcon icon="piggy-bank" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        @click="goTo('/menu/fichajes')"
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/fichajes'),
        }"
      >
        <MDBIcon icon="door-open" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        @click="activarDevolucion()"
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/devolver'),
        }"
      >
        <MDBIcon icon="trash-alt" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        @click="goTo('/menu/pedidos')"
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/pedido'),
        }"
      >
        <MDBIcon icon="globe" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem @click="goTo('/tecnico')" class="mt-5">
        <MDBIcon icon="key" size="5x" />
      </MDBSideNavItem>
    </MDBSideNavMenu>
  </MDBSideNav>
</template>

<script>
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  //   MDBBtn,
  MDBIcon,
} from "mdb-vue-ui-kit";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "LateralComponent",
  components: {
    MDBSideNav,
    MDBSideNavMenu,
    MDBSideNavItem,
    // MDBBtn,
    MDBIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const sidenavPositions = ref(true);
    const mode = ref("over");
    const setMode = (value) => {
      mode.value = value;
    };

    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
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
            arrayCestas.value[i]._id ==
            arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    function goTo(x) {
      router.push(x);
    }

    async function activarDevolucion() {
      if (arrayCestas.value && cesta.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (cesta.value._id === arrayCestas.value[i]._id) {
            await store.dispatch("Cestas/setModoCesta", {
              modo: "DEVOLUCION",
              index: i,
            });
            router.push("/main");
            break;
          }
        }
      }
    }

    return {
      sidenavPositions,
      mode,
      setMode,
      router,
      goTo,
      activarDevolucion,
    };
  },
};
</script>

<style lang="scss">
.activo {
  background-color: #f19d65;
}
.sidenav.sidenav-slim-collapsed {
  min-width: 10rem !important;
  max-width: 10rem !important;
}
</style>
