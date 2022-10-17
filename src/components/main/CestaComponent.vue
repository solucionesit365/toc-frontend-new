<template>
  <div
    class="table-responsive estiloCesta section"
    style="height: 26vh !important"
    v-if="listaAlReves"
  >
    <table class="table colorFuente" id="job-table">
      <thead style="background-color: red">
        <tr>
          <th scope="col">Productos</th>
          <th scope="col">Unidades</th>
          <th scope="col">Precio</th>
        </tr>
      </thead>
      <tbody class="tableBody" :style="conCliente">
        <tr
          v-for="(item, index) of listaAlReves"
          :key="index"
          v-bind:class="{
            estiloPromo: item.promocion.esPromo,
            seleccionado: activo === index,
          }"
        >
          <td>Coca Cola Zero</td>
          <td>2</td>
          <td>3.50</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <button class="btn btn-primary btn-lg">Inicializar cesta</button>
  </div>
</template>

<script>
import store from "@/store";
import { computed } from "vue";

export default {
  name: "CestaComponent",
  setup() {
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const cesta = computed(() => {
      if (arrayCestas.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (
            arrayCestas.value[i]._id ==
            arrayTrabajadores.value[indexTrabajadorActivo.value]
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    const listaAlReves = computed(() => {
      let aux = null;
      if (cesta.value && cesta.value.lista) {
        aux = cesta.value.lista;
        return aux.reverse();
      }
      return null;
    });

    console.log(arrayTrabajadores.value[indexTrabajadorActivo.value]);

    return {
      listaAlReves,
    };
  },
};
</script>

<style lang="scss" scoped>
.seleccionado {
  background-color: rgb(255, 221, 176);
}
.colorFuente {
  color: #606060 !important;
}
</style>
