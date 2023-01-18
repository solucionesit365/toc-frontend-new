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
      :class="{ oculto: parametros?.prohibirEntradas === 'Si' }"
      @click="goTo('/menu/caja/entradaDinero')"
      >Entrada de dinero</MDBBtn
    >
    <MDBBtn
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/verUltimoCierre')"
      >Ver último cierre</MDBBtn
    >
    <MDBBtn
      v-if="cajaAbierta"
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/menu/caja/cerrarCaja')"
      >Cerrar caja</MDBBtn
    >
    <MDBBtn
      v-else
      outline="dark"
      class="opcionesPrincipales"
      @click="goTo('/abrirCaja')"
      >Abrir caja</MDBBtn
    >
  </div>
  <div class="row mt-1">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
import { MDBBtn } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import { onMounted, ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "CajaView",
  components: {
    MDBBtn,
  },
  setup() {
    const router = useRouter();
    const cajaAbierta = ref(null);
    const store = useStore();
    const parametros = computed(() => store.state.Configuracion.parametros);

    function goTo(x) {
      router.push(x);
    }

    function getEstado() {
      axios
        .get("caja/estadoCaja")
        .then((res) => {
          cajaAbierta.value = res.data;
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    onMounted(() => {
      getEstado();
    });

    return {
      goTo,
      cajaAbierta,
      parametros,
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
.oculto {
  visibility: hidden;
}
</style>
