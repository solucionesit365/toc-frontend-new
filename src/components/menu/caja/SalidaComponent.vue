<template>
  <div class="col-md-9 colJuntitas">
    <MDBCard text="center" class="sizeSalida mt-2">
      <MDBCardHeader>Salida de dinero</MDBCardHeader>
      <MDBCardBody v-if="numpadRef && numpadRef.cantidad">
        <div class="input-group input-group-lg">
          <input
            v-model="numpadRef.cantidad"
            type="text"
            class="form-control"
            placeholder="Introduce la cantidad"
            disabled
          />
        </div>
        <select
          class="form-select form-select-lg mb-3 mt-2"
          aria-label=".form-select-lg example"
          v-model="concepto"
        >
          <option value="Entrega Diària" selected>ENTREGA DIARIA</option>
          <option value="COMPRAS">COMPRAS</option>
          <option value="OTROS">OTROS</option>
        </select>
      </MDBCardBody>
      <MDBCardFooter class="text-muted text-end">
        <MDBBtn color="success" size="lg" @click="confirmarSalida()"
          >Confirmar salida</MDBBtn
        >
      </MDBCardFooter>
    </MDBCard>
  </div>
  <div class="col-md-3 colJuntitas"><NumpadComponent ref="numpadRef" /></div>
</template>

<script>
import axios from "axios";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
} from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import { provide, ref, computed } from "vue";
import { useStore } from "vuex";
import NumpadComponent from "../../NumpadComponent.vue";
export default {
  name: "SalidaComponent",
  components: {
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    NumpadComponent,
    MDBBtn,
    MDBCardFooter,
  },
  setup() {
    const store = useStore();
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const trabajadorActivo = computed(() => {
      if (
        arrayTrabajadores.value &&
        indexTrabajadorActivo.value != null &&
        indexTrabajadorActivo.value != undefined &&
        arrayTrabajadores.value[indexTrabajadorActivo.value]
      ) {
        return arrayTrabajadores.value[indexTrabajadorActivo.value];
      }
      return null;
    });
    const numpadRef = ref(null);
    const concepto = ref("Entrega Diària");
    function confirmarSalida() {
      axios
        .post("movimientos/nuevoMovimiento", {
          cantidad: Number(numpadRef.value.cantidad),
          concepto: concepto.value,
          idTrabajador: trabajadorActivo.value._id,
          tipo: "SALIDA",
        })
        .then((res) => {
          if (res.data) {
            numpadRef.value.setValor("0");
            Swal.fire(
              "Perfecto",
              "Salida de dinero realizada correctamente",
              "success"
            );
          } else {
            throw Error("No se ha podido realizar la salida de dinero");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }
    provide("okValue", confirmarSalida);
    return {
      confirmarSalida,
      numpadRef,
      concepto,
    };
  },
};
</script>

<style lang="scss" scoped>
.sizeSalida {
  max-width: 50rem;
  min-width: 50rem;
}
.colJuntitas {
  padding: 3px 0px 3px 0px;
}
</style>
