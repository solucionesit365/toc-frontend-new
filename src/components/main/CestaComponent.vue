<template>
  <div class="table-responsive section divCesta" v-if="listaAlReves">
    <table class="table colorFuente">
      <tbody class="tableBody">
        <tr
          v-for="(item, index) of listaAlReves"
          :key="index"
          class="itemCesta"
          v-bind:class="{
            estiloPromo: item.promocion,
            seleccionado: activo === index,
          }"
        >
          <td>
            <span
              class="d-inline-block text-truncate"
              style="max-width: 21rem; min-width: 21rem"
              >{{ item.nombre }}</span
            >
            <span class="xUnidades ms-2"> x{{ item.unidades }}</span>
          </td>
          <td>{{ item.subtotal.toFixed(2) }} €</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Cesta no inicializada</MDBCardTitle>
        <MDBCardText>
          En este momento no hay ninguna cesta seleccionada para
          <span class="fw-bold">{{
            arrayTrabajadores[indexTrabajadorActivo].nombre
          }}</span>
        </MDBCardText>
        <MDBBtn color="primary">Crear nueva cesta</MDBBtn>
      </MDBCardBody>
    </MDBCard>
  </div>
</template>

<script>
import store from "@/store";
import { computed } from "vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
export default {
  name: "CestaComponent",
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
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
            arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }

      return null;
    });
    console.log("la cesta es: ", cesta.value);
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
      arrayTrabajadores,
      indexTrabajadorActivo,
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
.divCesta {
  background-color: white;
  height: 15.6rem !important;
}
.tableBody {
  font-size: 1.3rem;
}
.xUnidades {
  display: inline-block !important;
  vertical-align: top;
  font-weight: bold;
}
.itemCesta {
  line-height: 22px;
}
</style>
