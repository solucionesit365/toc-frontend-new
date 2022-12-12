<template>
  <div class="row" style="margin-top: 1px">
    <div class="btn-group shadow-none" role="group">
      <button
        v-for="(item, index) in teclado"
        v-bind:key="index"
        :class="{ activo: index == indexMenuActivo }"
        class="btn btn-secondary border border-1 rounded botonesMenu menusColorIvan"
        @click="setActivo(index)"
      >
        {{ item.nombre }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "MenusComponent",
  setup(_props, { expose }) {
    const store = useStore();
    const teclado = computed(() => store.state.Teclado.objTeclado);
    const indexMenuActivo = computed(() => store.state.Teclado.indexMenuActivo);

    function setActivo(x) {
      store.dispatch("Teclado/setIndexMenuActivo", x);
    }

    onMounted(() => {
      setActivo(0);
    });

    expose({
      indexMenuActivo,
    });

    return {
      teclado,
      indexMenuActivo,
      setActivo,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoMaxBotonMenu: 8.24rem;
$anchoMinBotonMenu: 8.24rem;
$altoMaxBotonMenu: 3.7rem;
$altoMinBotonMenu: 3.7rem;
.botonesMenu {
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18 !important;
  margin-right: 4px;
  font-size: 0.92rem;
  height: 60px;
  font-weight: bold;
  max-width: $anchoMaxBotonMenu;
  min-width: $anchoMinBotonMenu;
  max-height: $altoMaxBotonMenu;
  min-height: $altoMinBotonMenu;
}

.activo {
  background-color: #d45600 !important;
  color: #fffaee !important;
  border-color: #d45600 !important;
}
.btn-secondary:hover {
  color: #c95907;
  background-color: #fff5e9;
  border-color: #bf5c18 !important;
}
.btn-secondary:focus,
.btn-secondary.focus {
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18 !important;
  box-shadow: none !important;
}

.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18 !important;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus
  .show
  > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}

.menusColorIvan.btn-secondary:hover {
  color: #c95907;
  background-color: #fff5e9;
  border-color: #bf5c18 !important;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:focus,
.btn-secondary.focus {
  color: #c95907;
  background-color: #fff5e9;
  border-color: #bf5c18 !important;
  box-shadow: none !important;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #c95907;
  background-color: #fff5e9;
  border-color: #bf5c18 !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}
</style>
