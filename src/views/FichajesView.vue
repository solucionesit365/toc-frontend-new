<template>
  <div class="row mt-1 position-relative">
    <div class="position-absolute top-50 start-50 translate-middle">
      <MDBBtn color="primary" class="botonesAcciones">
        <MDBIcon icon="play" iconStyle="fas" size="4x" />
      </MDBBtn>
      <MDBBtn color="primary" class="botonesAcciones">
        <MDBIcon icon="pause" iconStyle="fas" size="4x" />
      </MDBBtn>
      <MDBBtn color="primary" class="botonesAcciones">
        <MDBIcon icon="stop" iconStyle="fas" size="4x" />
      </MDBBtn>
    </div>
  </div>
</template>

<script>
import { MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
export default {
  name: "fichajesView",
  components: {
    MDBBtn,
    MDBIcon,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$ancho: 5.5rem;
$alto: 5rem;
.botonesAcciones {
  max-width: $ancho;
  min-width: $ancho;
  min-height: $alto;
  max-height: $alto;
}
</style>
