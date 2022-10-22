<template>
  <template v-if="arrayMesas.length > 0">
    <div class="row mt-2" v-for="(_row, y) in 5" v-bind:key="y">
      <div
        class="mesa ms-2"
        v-for="(_mesa, index) in 10"
        v-bind:key="index"
        :class="[
          index === 0 ? 'ms-5' : '',
          arrayMesas[index + y * 10].nombre ? 'habilitada' : 'deshabilitada',
        ]"
      >
        <span class="nombreMesa">{{ arrayMesas[index + y * 10].nombre }}</span>
      </div>
    </div>
  </template>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

export default {
  name: "MesasComponent",
  setup() {
    const arrayMesas = ref([]);

    onMounted(() => {
      axios
        .get("mesas/getMesas")
        .then((resMesas) => {
          console.log(resMesas.data);
          if (resMesas.data) arrayMesas.value = resMesas.data;
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    });
    return {
      arrayMesas,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoMesa: 7.5rem;
$altoMesa: 7.5rem;
.mesa {
  max-width: $anchoMesa;
  min-width: $anchoMesa;
  min-height: $altoMesa;
  max-height: $altoMesa;
}
.habilitada {
  background-color: rgb(152, 219, 136);
}
.deshabilitada {
  background-color: rgb(175, 175, 175);
}
</style>
