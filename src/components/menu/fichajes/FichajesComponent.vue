<template>
  <div class="row">
    <MDBBtn color="primary">
      <MDBIcon icon="play" iconStyle="fas" />
    </MDBBtn>
  </div>
</template>

<script>
import { MDBBtn, MDBIcon } from "mdb-vue-ui-kit";
export default {
  name: "FichajesComponent",
  components: {
    MDBBtn,
    MDBIcon,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
