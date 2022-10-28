<template>
  <MDBModal
    id="modalPeso"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="modalPeso"
    staticBackdrop
  >
    <MDBModalHeader>
      <MDBModalTitle id="staticBackdropLabel">
        Introduce los gramos
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody class="mx-auto">
      <div class="row">
        <MDBInput
          v-if="numpadRef && numpadRef.cantidad"
          v-model="numpadRef.cantidad"
        />
      </div>
      <div class="row">
        <NumpadComponent ref="numpadRef" />
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="danger" @click="modalPeso = false" size="lg">
        Cerrar
      </MDBBtn>
      <MDBBtn color="success" size="lg"> Aceptar </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
} from "mdb-vue-ui-kit";
import NumpadComponent from "../NumpadComponent.vue";
import { ref, provide } from "vue";
export default {
  name: "PesoComponent",
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBInput,
    NumpadComponent,
  },
  setup(_props, { expose }) {
    const modalPeso = ref(false);
    const numpadRef = ref(null);
    const infoArticulo = ref(null);

    function abrirModal() {
      modalPeso.value = true;
    }

    expose({
      abrirModal,
    });

    function addItem(gramos) {
      console.log("AQUÍ SE TIENE QUE LLAMAR AL MÉTODO DEL PADRE", gramos);
    }

    function test() {
      console.log(45);
    }

    provide("okValue", addItem);

    return {
      modalPeso,
      numpadRef,
      infoArticulo,
      test,
    };
  },
};
</script>

<style lang="scss" scoped></style>
