<template>
  <div class="col-md-9 colJuntitas">
    <MDBCard text="center" class="sizeSalida mt-2">
      <MDBCardHeader>Entrada de dinero</MDBCardHeader>
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
        <div class="input-group input-group-lg mt-2">
          <input
            v-model="concepto"
            type="text"
            class="form-control"
            placeholder="Concepto"
          />
        </div>
      </MDBCardBody>
      <MDBCardFooter class="text-muted text-end">
        <MDBBtn color="success" size="lg" @click="confirmarEntrada()"
          >Confirmar entrada</MDBBtn
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
  name: "EntradaComponent",
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
    const concepto = ref("");
    function confirmarEntrada() {
      console.log("confirmarEntrada");
    }
    provide("okValue", confirmarEntrada);
    return {
      confirmarEntrada,
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
