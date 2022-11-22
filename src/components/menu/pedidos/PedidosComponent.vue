<template>
  <div class="row">
    <iframe
      :src="url"
      style="position: absolute; height: 90%; width: 100%; border: none"
    ></iframe>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { computed, ref } from "vue";

export default {
  name: "PedidosComponent",
  setup() {
    const parametros = ref(null);
    const url = computed(() => {
      if (parametros.value) {
        return `http://silema.hiterp.com/TpvWeb.asp?Empresa=${parametros.value.database}&codiBotiga=${parametros.value.codigoTienda}`;
      }
      return null;
    });

    axios
      .post("parametros/getParametros")
      .then((resParametros) => {
        if (resParametros.data) {
          parametros.value = resParametros.data;
        } else {
          throw Error("No se han podido obtener los parámetros");
        }
      })
      .catch((err) => {
        Swal.fire("Oops...", err.message, "error");
      });

    return {
      parametros,
      url,
    };
  },
};
</script>

<style lang="scss" scoped></style>
