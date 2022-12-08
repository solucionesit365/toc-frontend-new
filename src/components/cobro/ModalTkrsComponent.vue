<template>
  <MDBModal
    id="modalTkrs"
    tabindex="-1"
    labelledby="modalTkrsLabel"
    v-model="modalTkrs"
  >
    <MDBModalHeader>
      <MDBModalTitle id="modalTkrsLabel">
        Introduce la cantidad del Tiquet Restaurant
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="row">
        <span class="cantidad text-center" v-if="numPadRef">{{
          numPadRef.cantidad
        }}</span>
      </div>
      <div class="row mt-2">
        <div class="col text-center">
          <NumpadComponent ref="numPadRef" />
        </div>
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="danger" size="lg" @click="modalTkrs = false"
        >Cerrar</MDBBtn
      >
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
import { ref, provide, inject } from "vue";
export default {
  name: "ModalTkrsComponent",
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
    const modalTkrs = ref(false);
    const numPadRef = ref(null);
    const setTkrs = inject("setTkrs");

    function abrirModal() {
      modalTkrs.value = true;
    }

    function okValue() {
      modalTkrs.value = false;
      setTkrs(numPadRef.value.cantidad);
    }

    provide("okValue", okValue);

    expose({
      abrirModal,
    });

    return {
      modalTkrs,
      numPadRef,
      okValue,
    };
  },
};
</script>

<style lang="scss" scoped>
.cantidad {
  font-size: 2rem;
  font-weight: bold;
}
</style>
