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
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/fichajes'),
        }"
      >
        <MDBIcon icon="door-open" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/devolver'),
        }"
      >
        <MDBIcon icon="trash-alt" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        class="mt-5"
        :class="{
          activo: router.currentRoute.value.path.startsWith('/menu/pedido'),
        }"
      >
        <MDBIcon icon="globe" size="5x" />
      </MDBSideNavItem>
      <MDBSideNavItem
        class="mt-5"
        :class="{ activo: router.currentRoute.value.path == '/menu/algo' }"
      >
        <MDBIcon icon="clipboard-list" size="5x" />
      </MDBSideNavItem>
    </MDBSideNavMenu>
  </MDBSideNav>
  <!-- <div id="wow">
    lolaso guapo<MDBBtn
      color="primary"
      aria-controls="#sidenavPositions"
      @click="sidenavPositions = !sidenavPositions"
    >
      <MDBIcon icon="bars" />
    </MDBBtn>
  </div>


  {{ router.currentRoute.value.path }} -->
</template>

<script>
import {
  MDBSideNav,
  MDBSideNavMenu,
  MDBSideNavItem,
  //   MDBBtn,
  MDBIcon,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { useRouter } from "vue-router";

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
    const sidenavPositions = ref(true);
    const mode = ref("over");
    const setMode = (value) => {
      mode.value = value;
    };
    function goTo(x) {
      router.push(x);
    }

    return {
      sidenavPositions,
      mode,
      setMode,
      router,
      goTo,
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
