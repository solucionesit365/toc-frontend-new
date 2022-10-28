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
</template>

<script>
import CambioComponent from "../components/cobro/CambioComponent.vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
export default {
  name: "CobroView",
  components: {
    CambioComponent,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
  setup() {
    return {};
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
