<template>
  <MDBModal
    id="modalSuplementos"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="modalSuplementos"
    staticBackdrop
  >
    <MDBModalHeader>
      <MDBModalTitle id="staticBackdropLabel">
        Selecciona los suplementos
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
      <MDBBtn color="danger" @click="modalSuplementos = false" size="lg">
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
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SuplementosComponent",
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
    const modalSuplementos = ref(false);
    const numpadRef = ref(null);
    const infoArticulo = ref({
      idArticulo: null,
      idCesta: null,
    });

    function abrirModal(idArticulo, idCesta) {
      infoArticulo.value.idArticulo = idArticulo;
      infoArticulo.value.idCesta = idCesta;
      modalSuplementos.value = true;
    }

    expose({
      abrirModal,
    });

    function insertarArticulo(gramos) {
      axios
        .post("teclado/clickTeclaArticulo", {
          idArticulo: infoArticulo.value.idArticulo,
          gramos,
          idCesta: infoArticulo.value.idCesta,
          unidades: 1,
          arraySuplementos: null,
        })
        .then((res) => {
          if (res.data) {
            infoArticulo.value.idArticulo = null;
            infoArticulo.value.idCesta = null;
            modalSuplementos.value = false;
          } else {
            throw Error("No se ha podido insertar el artículo a peso");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function test() {
      console.log(45);
    }

    provide("okValue", insertarArticulo);

    return {
      modalSuplementos,
      numpadRef,
      infoArticulo,
      test,
    };
  },
};
</script>

<style lang="scss" scoped></style>
