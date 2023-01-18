<template>
  <!-- Button trigger modal -->
  <MDBBtn
    color="primary"
    aria-controls="modalAlergenos"
    @click="modalAlergenos = true"
  >
    Launch demo modal
  </MDBBtn>
  <MDBModal
    id="modalAlergenos"
    tabindex="-1"
    labelledby="modalAlergenosLabel"
    v-model="modalAlergenos"
  >
    <MDBModalHeader>
      <MDBModalTitle id="modalAlergenosLabel"> Modal title </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>...</MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="modalAlergenos = false">Close</MDBBtn>
      <MDBBtn color="primary">Save changes</MDBBtn>
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
export default {
  name: "ModalAlergenosComponent",
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const modalAlergenos = ref(false);

    function abrirModal(idArticulo) {
      modalAlergenos.value = true;
    }

    expose({
      abrirModal,
    });

    return {
      modalAlergenos,
      abrirModal,
    };
  },
};
</script>

<style lang="scss" scoped></style>
