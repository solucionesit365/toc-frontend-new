<template>
  <MenusComponent />
  <SubmenusComponent />
  <TeclasComponent />
  <CestaComponent />
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
