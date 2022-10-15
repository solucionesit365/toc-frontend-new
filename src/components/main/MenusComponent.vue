<template>
  <div class="row">
    <div class="btn-group shadow-none" role="group">
      <button
        v-for="(item, index) in teclado"
        v-bind:key="index"
        :class="{ activo: index == indexActivo }"
        class="btn btn-secondary border border-1 rounded botonesMenu menusColorIvan"
        @click="setActivo(index)"
      >
        {{ item.nombre }}
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import store from "@/store";

export default {
  name: "MenusComponent",
  setup() {
    const teclado = computed(() => store.state.Teclado.objTeclado);
    const indexActivo = ref(null);

    function setActivo(x) {
      indexActivo.value = x;
    }

    onMounted(() => {
      setActivo(0);
    });

    return {
      teclado,
      indexActivo,
      setActivo,
    };
  },
};
</script>

<style lang="scss" scoped>
.botonesMenu {
  background-color: #fff5e9;
  color: #c95907;
  border-color: #bf5c18 !important;
  margin-right: 4px;
  font-size: 1.2rem;
  height: 70px;
  font-weight: bold;
  max-width: 13rem;
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
