<template>
  <div
    v-if="
      teclado &&
      teclado[indexMenuActivo] &&
      teclado[indexMenuActivo].arraySubmenus &&
      teclado[indexMenuActivo].arraySubmenus.length > 0
    "
    class="row mt-1"
  >
    <div
      class="col"
      style="padding: 0px 6px 0px 1px"
      v-for="(item, index) in teclado[indexMenuActivo].arraySubmenus"
      v-bind:key="index"
    >
      <button
        :class="{ activo: index == indexSubmenuActivo }"
        class="btn btn-secondary border border-1 rounded botonesSubmenus menusColorIvan w-100"
        @click="setIndexSubmenu(index)"
      >
        {{ item.nombre }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SubmenusComponent",
  setup() {
    const store = useStore();
    const teclado = computed(() => store.state.Teclado.objTeclado);
    const indexMenuActivo = computed(() => store.state.Teclado.indexMenuActivo);
    const indexSubmenuActivo = computed(
      () => store.state.Teclado.indexSubmenuActivo
    );

    function setIndexSubmenu(x) {
      store.dispatch("Teclado/setIndexSubmenuActivo", x);
    }

    return {
      teclado,
      indexMenuActivo,
      indexSubmenuActivo,
      setIndexSubmenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.botonesSubmenus {
  background-color: #adadadbd;
  color: #fffaee;
  border-color: #adadadbd !important;
  margin-right: 4px;
  font-size: 16.4px;
  height: 50px;
  font-weight: bold;
  // max-width: 9.24rem;
  // min-width: 9.24rem;
  max-height: 2.8rem;
  min-height: 2.8rem;
}

.activo {
  background-color: #007fd4 !important;
  color: #fffaee !important;
  border-color: #007fd4 !important;
}
.btn-secondary:hover {
  color: #fffaee;
  background-color: #fff5e9;
  border-color: #adadadbd !important;
}
.btn-secondary:focus,
.btn-secondary.focus {
  background-color: #fff5e9;
  color: #fffaee;
  border-color: #adadadbd !important;
  box-shadow: none !important;
}

.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  background-color: #fff5e9;
  color: #fffaee;
  border-color: #adadadbd !important;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus
  .show
  > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}

.menusColorIvan.btn-secondary:hover {
  color: #fffaee;
  background-color: #fff5e9;
  border-color: #adadadbd !important;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:focus,
.btn-secondary.focus {
  color: #fffaee;
  background-color: #fff5e9;
  border-color: #adadadbd !important;
  box-shadow: none !important;
  border-width: 3px;
}
.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  color: #fffaee;
  background-color: #fff5e9;
  border-color: #adadadbd !important;
  border-width: 3px;
}

.menusColorIvan.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus,
.show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}
</style>
