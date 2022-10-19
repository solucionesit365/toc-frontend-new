<template>
  <div class="row">
    <span class="nombreTrabajador text-center">{{
      trabajadorActivo.nombreCorto
    }}</span>
  </div>
  <div class="row">
    <MDBBtn v-if="!datafonoEnUso" outline="primary" class="botonEstado">
      <span class="disponible">Datáfono disponible</span>
    </MDBBtn>
    <!-- <MDBBtn v-else outline="primary" class="botonEstado">
      <img
        src="pay-loading.svg"
        alt="Procesando pago"
        width="200"
        height="50"
      />
    </MDBBtn> -->
    <img
      v-else
      src="pay-loading.svg"
      alt="Procesando pago"
      width="200"
      height="60"
    />
  </div>
  <div class="row mt-2">
    <MDBBtn outline="primary" class="botonPagar">
      <MDBIcon icon="hand-holding-usd" size="5x" />
      <span class="letraTotal ms-3 mt-2"> 2,56 € </span></MDBBtn
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { MDBIcon, MDBBtn } from "mdb-vue-ui-kit";
export default {
  name: "MenuDerechaComponent",
  components: {
    MDBIcon,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const datafonoEnUso = computed(() => store.state.Datafono.enUso);
    const trabajadorActivo = computed(() => {
      if (
        arrayTrabajadores.value &&
        indexTrabajadorActivo.value != undefined &&
        indexTrabajadorActivo.value != null &&
        arrayTrabajadores.value[indexTrabajadorActivo.value]
      ) {
        return arrayTrabajadores.value[indexTrabajadorActivo.value];
      }
      return null;
    });

    return {
      trabajadorActivo,
      datafonoEnUso,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoBotonPagar: 20.8rem;
$altoBotonPagar: 8rem;
$anchoBotonEstado: 20.8rem;
$altoBotonEstado: 3.5rem;
.nombreTrabajador {
  font-size: 1.5rem;
  font-weight: bold;
}
.botonPagar {
  min-width: $anchoBotonPagar;
  max-width: $anchoBotonPagar;
  min-height: $altoBotonPagar;
  max-height: $altoBotonPagar;
}
.botonEstado {
  min-width: $anchoBotonEstado;
  max-width: $anchoBotonEstado;
  min-height: $altoBotonEstado;
  max-height: $altoBotonEstado;
}
.letraTotal {
  font-size: 1.5rem;
  font-weight: bold;
  display: inline-block !important;
  vertical-align: top;
}
.disponible {
  color: #00c919;
  font-weight: bold;
  font-size: 1rem;
}
.fotoProcesandoPago {
  display: inline-block !important;
  vertical-align: top;
}
</style>
