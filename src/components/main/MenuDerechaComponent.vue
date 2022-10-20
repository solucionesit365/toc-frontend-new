<template>
  <div class="row">
    <span v-if="trabajadorActivo" class="nombreTrabajador text-center">{{
      trabajadorActivo.nombreCorto
    }}</span>
  </div>
  <div class="row">
    <MDBBtn v-if="!datafonoEnUso" outline="primary" class="botonEstado">
      <span class="disponible">Datáfono disponible</span>
    </MDBBtn>
    <img
      v-else
      src="pay-loading.svg"
      alt="Procesando pago"
      width="200"
      height="60"
    />
  </div>
  <div class="row mt-1">
    <MDBBtn outline="primary" class="botonPagar">
      <MDBIcon icon="hand-holding-usd" size="5x" />
      <span v-if="cesta" class="letraTotal ms-3 mt-2">
        {{ getTotal(cesta).toFixed(2) }} €
      </span></MDBBtn
    >
    <span class="text-end fst-italic informacion"
      >Tienda (t-000) Empresa (Tena) Versión (4.0)</span
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
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
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

    function getTotal(cesta) {
      return (
        cesta.detalleIva.importe1 +
        cesta.detalleIva.importe2 +
        cesta.detalleIva.importe3
      );
    }

    return {
      trabajadorActivo,
      datafonoEnUso,
      cesta,
      getTotal,
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
  font-size: 3.5rem;
  font-weight: bold;
  // display: inline-block !important;
  // vertical-align: top;
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
.informacion {
  font-size: 1rem;
}
</style>
