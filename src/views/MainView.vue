<template>
  <MenusComponent />
  <SubmenusComponent />
  <TeclasComponent ref="refTeclasComponent" />
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
import { provide, ref } from "vue";

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
  setup() {
    const refTeclasComponent = ref(null);

    function clickTecla(item) {
      refTeclasComponent.value.clickTecla(item);
    }

    provide("clickTecla", clickTecla);
    return {
      refTeclasComponent,
    };
  },
};
</script>
