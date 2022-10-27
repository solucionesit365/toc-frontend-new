<template>
  <LateralComponent />
  <div class="margenLateral">
    <router-view />
  </div>
</template>

<script>
import LateralComponent from "../components/menu/LateralComponent.vue";
export default {
  name: "MenuPrincipalView",
  components: {
    LateralComponent,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.margenLateral {
  margin-left: 11rem !important;
}
</style>
