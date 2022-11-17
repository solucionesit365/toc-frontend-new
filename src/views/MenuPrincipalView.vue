<template>
  <LateralComponent />
  <div class="margenLateral position-relative">
    <router-view />
    <div class="position-absolute bottom-0 start-0 mb-1 mt-4">
      <div class="sizeTrabajadores">
        <div class="btn-group" role="group">
          <button
            v-for="(item, index) in arrayTrabajadores"
            v-bind:key="index"
            type="button"
            class="btn btn-lg sizeBotonesTrabajador d-inline-block text-truncate me-2"
            :class="[
              index === indexActivo ? 'btn-primary' : 'btn-outline-primary',
            ]"
            @click="setIndexActivo(index)"
          >
            {{ item.nombre }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LateralComponent from "../components/menu/LateralComponent.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "MenuPrincipalView",
  components: {
    LateralComponent,
  },
  setup() {
    const store = useStore();
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexActivo = computed(() => store.state.Trabajadores.indexActivo);

    function setIndexActivo(index) {
      store.dispatch("Trabajadores/setIndexActivo", index);
    }

    return {
      arrayTrabajadores,
      setIndexActivo,
      indexActivo,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCajaTrabajadores: 73rem;
$altoCajaTrabajadores: 4rem;
$anchoBotonesTrabajador: 17rem;
$altoBotonesTrabajador: 3.3rem;
$altoMain: 47.5rem;
.margenLateral {
  margin-left: 11rem !important;
  max-height: $altoMain;
  min-height: $altoMain;
}
.sizeTrabajadores {
  width: $anchoCajaTrabajadores;
  max-height: $altoCajaTrabajadores;
  min-height: $altoCajaTrabajadores;
  overflow-x: scroll;
  display: block;
}

.sizeBotonesTrabajador {
  max-width: $anchoBotonesTrabajador;
  min-width: $anchoBotonesTrabajador;
  min-height: $altoBotonesTrabajador;
  max-height: $altoBotonesTrabajador;
  font-size: 1.2rem;
}
</style>
