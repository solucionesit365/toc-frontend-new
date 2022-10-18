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
      <NumpadComponent />
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
    NumpadComponent,
  },
  setup(_props, { expose }) {
    const modalPeso = ref(false);

    function abrirModal() {
      modalPeso.value = true;
    }

    expose({
      abrirModal,
    });

    function addItem(gramos) {
      console.log("AQUÍ SE TIENE QUE LLAMAR AL MÉTODO DEL PADRE", gramos);
    }

    provide("okValue", addItem);

    return {
      modalPeso,
    };
  },
};
</script>

<style lang="scss" scoped></style>
