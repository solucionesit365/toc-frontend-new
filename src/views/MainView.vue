<template>
  <MenusComponent />
  <SubmenusComponent />
  <TeclasComponent />
  <div class="row mt-1">
    <div class="col-md-3">AQUÍ EL MENÚ OPCIONES</div>
    <div class="col-md-6">
      <CestaComponent />
    </div>
    <div class="col-md-3">AQUÍ EL MENÚ COBRO</div>
  </div>
</template>

<script>
import MenusComponent from "@/components/main/MenusComponent.vue";
import SubmenusComponent from "@/components/main/SubmenuComponent.vue";
import TeclasComponent from "@/components/main/TeclasComponent.vue";
import CestaComponent from "@/components/main/CestaComponent.vue";

export default {
  name: "MainView",
  components: {
    MenusComponent,
    SubmenusComponent,
    TeclasComponent,
    CestaComponent,
  },
};
</script>
