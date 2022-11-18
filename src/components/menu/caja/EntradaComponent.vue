<template>
  <div class="col-md-9 colJuntitas">
    <MDBCard text="center" class="sizeSalida mt-2">
      <MDBCardHeader>Entrada de dinero</MDBCardHeader>
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
        <div class="input-group input-group-lg mt-2">
          <input
            v-model="concepto"
            type="text"
            class="form-control"
            placeholder="Concepto"
          />
        </div>
      </MDBCardBody>
      <MDBCardFooter class="text-muted text-end">
        <MDBBtn color="success" size="lg" @click="confirmarEntrada()"
          >Confirmar entrada</MDBBtn
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
  name: "EntradaComponent",
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
    const concepto = ref("");
    function confirmarEntrada() {
      axios
        .post("movimientos/nuevoMovimiento", {
          cantidad: Number(numpadRef.value.cantidad),
          concepto: concepto.value,
          idTrabajador: trabajadorActivo.value._id,
          tipo: "ENTRADA",
        })
        .then((res) => {
          if (res.data) {
            numpadRef.value.setValor("0");
            Swal.fire(
              "Perfecto",
              "Entrada de dinero realizada correctamente",
              "success"
            );
          } else {
            throw Error("No se ha podido realizar la entrada de dinero");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }
    provide("okValue", confirmarEntrada);
    return {
      confirmarEntrada,
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
