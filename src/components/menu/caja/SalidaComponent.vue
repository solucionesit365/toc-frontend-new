<template>
  <div class="col-md-9 colJuntitas">
    <MDBCard text="center" class="sizeSalida mt-2">
      <MDBCardHeader>Salida de dinero</MDBCardHeader>
      <MDBCardBody v-if="numpadRef && numpadRef.cantidad">
        <div class="input-group input-group-lg">
          <input
            v-model="numpadRef.cantidad"
            type="text"
            class="form-control"
            placeholder="Introduce la cantidad"
            disabled
          />
        </div>
        <select
          class="form-select form-select-lg mb-3 mt-2"
          aria-label=".form-select-lg example"
          v-model="concepto"
        >
          <option value="Entrega Diària" selected>ENTREGA DIARIA</option>
          <option value="COMPRAS">COMPRAS</option>
          <option value="OTROS">OTROS</option>
        </select>
      </MDBCardBody>
      <MDBCardFooter class="text-muted text-end">
        <MDBBtn color="success" size="lg" @click="confirmarSalida()"
          >Confirmar salida</MDBBtn
        >
      </MDBCardFooter>
    </MDBCard>
  </div>
  <div class="col-md-3 colJuntitas"><NumpadComponent ref="numpadRef" /></div>
</template>

<script>
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
} from "mdb-vue-ui-kit";
import { provide, ref } from "vue";
import NumpadComponent from "../../NumpadComponent.vue";
export default {
  name: "SalidaComponent",
  components: {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    NumpadComponent,
    MDBBtn,
    MDBCardFooter,
  },
  setup() {
    const numpadRef = ref(null);
    const concepto = ref("Entrega Diària");
    function confirmarSalida() {
      console.log("confirmarsalida");
    }
    provide("okValue", confirmarSalida);
    return {
      confirmarSalida,
      numpadRef,
      concepto,
    };
  },
};
</script>

<style lang="scss" scoped>
.sizeSalida {
  max-width: 50rem;
  min-width: 50rem;
}
.colJuntitas {
  padding: 3px 0px 3px 0px;
}
</style>
