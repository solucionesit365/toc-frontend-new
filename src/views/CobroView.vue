<template>
  <div class="row">
    <CambioComponent />
  </div>
  <div class="row mt-2">
    <div class="col">
      <MDBCard class="cardTicketRestaurante">
        <MDBCardBody>
          <MDBCardTitle>Ticket restaurante</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBBtn color="primary">Button</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>
    <div class="col">
      <MDBCard class="cardTicketRestaurante">
        <MDBCardBody>
          <MDBCardTitle>Ticket restaurante</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBBtn color="primary">Button</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </div>

    <!-- TICKET RESTAURANTE, COBRAR CON VISA, ¿CANCELAR OPERACIÓN DEL DATÁFONO? -->
  </div>
  <VolverComponent />
</template>

<script>
import { computed, provide } from "vue";
import CambioComponent from "../components/cobro/CambioComponent.vue";
import VolverComponent from "../components/Volver.vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
export default {
  name: "CobroView",
  components: {
    CambioComponent,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    VolverComponent,
  },
  setup() {
    const store = useStore();
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    // const trabajadorActivo = computed(() => {
    //   if (
    //     arrayTrabajadores.value &&
    //     indexTrabajadorActivo.value != undefined &&
    //     indexTrabajadorActivo.value != null &&
    //     arrayTrabajadores.value[indexTrabajadorActivo.value]
    //   ) {
    //     return arrayTrabajadores.value[indexTrabajadorActivo.value];
    //   }
    //   return null;
    // });

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

    provide("total", getTotal(cesta.value));

    return {
      cesta,
      getTotal,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCardTkrs: 40rem;
$altoCardTkrs: 20rem;
.cardTicketRestaurante {
  max-width: $anchoCardTkrs;
  min-width: $anchoCardTkrs;
  max-height: $altoCardTkrs;
  min-height: $altoCardTkrs;
}
</style>
