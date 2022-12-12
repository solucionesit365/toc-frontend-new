<template>
  <MenusComponent />
  <SubmenusComponent />
  <TeclasComponent ref="refTeclasComponent" />
  <div class="row mt-1">
    <div class="col-md-3">
      <MenuIzquierdaComponent ref="refMenuIzquierda" />
    </div>
    <div class="col-md-6">
      <CestaComponent ref="cestaRef" />
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
import { provide, ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

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
    const router = useRouter();
    const refTeclasComponent = ref(null);
    const refMenuIzquierda = ref(null);
    const cestaRef = ref(null);

    function clickTecla(item) {
      refTeclasComponent.value.clickTecla(item);
    }

    function resetGeneral() {
      refMenuIzquierda.value.resetGeneral();
    }

    // function reloadCesta() {
    //   refMenuIzquierda.value.reloadComponent();
    // }

    function actualizarPuntos() {
      cestaRef.value.actualizarPuntos();
    }

    provide("clickTecla", clickTecla);
    provide("resetGeneral", resetGeneral);
    provide("actualizarPuntos", actualizarPuntos);
    // provide("reloadCesta", reloadCesta);

    onMounted(() => {
      axios
        .get("caja/estadoCaja")
        .then((res) => {
          if (!res.data) {
            router.push("/abrirCaja");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    });

    return {
      refTeclasComponent,
      refMenuIzquierda,
      cestaRef,
    };
  },
};
</script>
