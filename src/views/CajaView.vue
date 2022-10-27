<template>
  <div class="row mt-1">
    <MDBBtn
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/tickets')"
      >Tickets</MDBBtn
    >
    <MDBBtn
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/salidaDinero')"
      >Salida de dinero</MDBBtn
    >
    <MDBBtn
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/entradaDinero')"
      >Entrada de dinero</MDBBtn
    >
    <MDBBtn outline="dark" class="opcionesPrincipales"
      >Ver último cierre</MDBBtn
    >
    <MDBBtn
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/cerrarCaja')"
      >Cerrar caja</MDBBtn
    >
  </div>
  <div class="row mt-1">
    <router-view />
  </div>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";
import { useRouter } from "vue-router";

export default {
  name: "CajaView",
  components: {
    MDBBtn,
  },
  setup() {
    const router = useRouter();
    function goTo(x) {
      router.push(x);
    }
    return {
      goTo,
    };
  },
};
</script>

<style lang="scss" scoped>
.opcionesPrincipales {
  max-width: 14rem;
  min-width: 14rem;
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 0.5rem;
}
</style>
