<template>
  <div class="row">
    <CambioComponent />
  </div>
</template>

<script>
import CambioComponent from "../components/cobro/CambioComponent.vue";
export default {
  name: "CobroView",
  components: {
    CambioComponent,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
