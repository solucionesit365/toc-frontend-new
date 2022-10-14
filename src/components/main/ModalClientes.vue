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
  {{ datoBorrar }}
  <button @click="test()">SUPER BOTÓN</button>
</template>

<script>
import { MDBModal, MDBModalBody, MDBBtn } from "mdb-vue-ui-kit";
import { ref, inject, onMounted } from "vue";

export default {
  name: "ModalClientesComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, context) {
    const modalClientes = ref(false);
    const datoBorrar = ref(0);
    function abrirModal() {
      modalClientes.value = true;
    }

    function test() {
      datoBorrar.value++;
    }

    const doSomething = inject("doSomething");

    context.expose({
      abrirModal,
      datoBorrar,
    });

    onMounted(() => {
      doSomething("jajj");
    });

    return {
      test,
      datoBorrar,
      modalClientes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
