<template>
  <MDBModal
    id="modalClientes"
    tabindex="-1"
    labelledby="tituloModalClientes"
    v-model="modalClientes"
    staticBackdrop
  >
    <MDBModalBody>
      <MDBBtn>SUPER PRUEBA</MDBBtn>
    </MDBModalBody>
  </MDBModal>
</template>

<script>
import { MDBModal, MDBModalBody, MDBBtn } from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: "ModalClientesComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, context) {
    const modalClientes = ref(false);

    function abrirModal() {
      modalClientes.value = true;
    }

    context.expose({
      abrirModal,
    });

    return {
      modalClientes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
