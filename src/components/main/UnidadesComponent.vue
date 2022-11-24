<template>
  <MDBModal
    id="modalUnidades"
    tabindex="-1"
    labelledby="modalUnidadesLabel"
    v-model="modalUnidades"
  >
    <MDBModalHeader>
      <MDBModalTitle id="modalUnidadesLabel">
        Introduce las unidades y marca un artículo
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="row">
        <input
          v-if="refUnidadesComponent"
          type="text"
          class="form-control sizeUnidades"
          disabled
          v-model="refUnidadesComponent.cantidad"
        />
      </div>
      <div class="row">
        <div class="text-center">
          <NumpadComponent ref="refUnidadesComponent" />
        </div>
      </div>
    </MDBModalBody>
  </MDBModal>
</template>

<script>
import { provide, ref } from "vue";
import NumpadComponent from "../NumpadComponent.vue";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalTitle,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
export default {
  name: "UnidadesComponent",
  components: {
    NumpadComponent,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalTitle,
  },
  setup() {
    const refUnidadesComponent = ref(null);
    const modalUnidades = ref(null);
    const store = useStore();

    function abrirModal() {
      modalUnidades.value = true;
    }

    function clickOk(x) {
      store.dispatch("Unidades/setUnidades", x);
      modalUnidades.value = false;
    }

    provide("okValue", clickOk);

    return {
      refUnidadesComponent,
      modalUnidades,
      abrirModal,
    };
  },
};
</script>

<style lang="scss" scoped>
.sizeUnidades {
  font-size: 2rem;
  font-weight: bold;
}
</style>
