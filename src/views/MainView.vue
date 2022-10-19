<template>
  <MenusComponent />
  <SubmenusComponent />
  <TeclasComponent />
  <div class="row mt-1">
    <div class="col-md-3">
      <MenuIzquierdaComponent />
    </div>
    <div class="col-md-6">
      <CestaComponent />
    </div>
    <div class="col-md-3">
      <MenuDerechaComponent />
    </div>
  </div>
</template>

<script>
import MenusComponent from "@/components/main/MenusComponent.vue";
import SubmenusComponent from "@/components/main/SubmenuComponent.vue";
import TeclasComponent from "@/components/main/TeclasComponent.vue";
import CestaComponent from "@/components/main/CestaComponent.vue";
import MenuIzquierdaComponent from "@/components/main/MenuIzquierdaComponent.vue";
import MenuDerechaComponent from "@/components/main/MenuDerechaComponent.vue";
export default {
  name: "MainView",
  components: {
    MenusComponent,
    SubmenusComponent,
    TeclasComponent,
    CestaComponent,
    MenuIzquierdaComponent,
    MenuDerechaComponent,
  },
};
</script>
