<template>
  <NumpadComponent />
</template>

<script>
import NumpadComponent from "./NumpadComponent.vue";
import { provide } from "vue";
export default {
  name: "TestComponent",
  components: {
    NumpadComponent,
  },
  setup() {
    function lolaso(x) {
      console.log("ESTO VIENE DE OTRO LADO", x);
    }

    provide("okValue", lolaso);

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
