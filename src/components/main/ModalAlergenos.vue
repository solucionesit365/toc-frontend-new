<template>
  <MDBModal
    id="modalAlergenos"
    tabindex="-1"
    labelledby="modalAlergenosLabel"
    v-model="modalAlergenos"
    fullscreen
  >
    <iframe
      :src="url"
      style="position: absolute; height: 90%; width: 90%; border: none"
    ></iframe>
    <MDBModalFooter>
      <MDBBtn color="danger" size="lg" @click="modalAlergenos = false"
        >Cerrar</MDBBtn
      >
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import { ref } from "vue";
import { MDBModal, MDBModalFooter, MDBBtn } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
export default {
  name: "ModalAlergenosComponent",
  components: {
    MDBModal,
    MDBModalFooter,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const modalAlergenos = ref(false);
    const url = ref("");
    const store = useStore();
    const parametros = store.getters["Configuracion/parametros"];

    function abrirModal(idArticulo) {
      setUrl(idArticulo);
      modalAlergenos.value = true;
    }

    function setUrl(idArticulo) {
      url.value = `http://silema.hiterp.com/Facturacion/ElForn/gestion/FichaTecnicaHtml.asp?codi=${idArticulo}&Llic=${parametros?.licencia}`;
    }

    expose({
      abrirModal,
    });

    return {
      modalAlergenos,
      abrirModal,
      url,
    };
  },
};
</script>

<style lang="scss" scoped></style>
