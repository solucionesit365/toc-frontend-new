<template>
  <div class="row">
    <CambioComponent ref="cambioRef" />
  </div>
  <div class="row mt-4">
    <div class="col">
      <MDBCard
        class="cardTicketRestaurante text-center"
        @click="setFormaPago('EFECTIVO')"
      >
        <MDBCardBody>
          <MDBCardText>
            <img
              src="img/img-efectivo.png"
              width="300"
              alt="Seleccionar efectivo"
            />
            <MDBIcon
              v-if="formaPago === 'EFECTIVO'"
              class="mt-4"
              icon="hand-pointer"
              size="5x"
            />
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
    <div class="col">
      <MDBCard
        class="cardTicketRestaurante text-center"
        v-if="modalTkrsRef"
        @click="modalTkrsRef.abrirModal()"
      >
        <MDBCardBody>
          <MDBCardText>
            <img
              src="img/img-tkrs.png"
              width="300"
              alt="Seleccionar pago con ticket restaurante"
            />
            <MDBIcon
              v-if="formaPago === 'TKRS'"
              class="mt-4"
              icon="hand-pointer"
              size="5x"
            />
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>
    <div class="col">
      <MDBCard
        class="cardTicketRestaurante text-center"
        @click="setFormaPago('TARJETA')"
      >
        <MDBCardBody>
          <MDBCardText>
            <img
              src="img/img-tarjetas.png"
              width="300"
              alt="Seleccionar pago con tarjeta"
            />
            <MDBIcon
              v-if="formaPago === 'TARJETA'"
              class="mt-4"
              icon="hand-pointer"
              size="5x"
            />
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </div>

    <!-- TICKET RESTAURANTE, COBRAR CON VISA, ¿CANCELAR OPERACIÓN DEL DATÁFONO? -->
  </div>
  <ModalTkrsComponent ref="modalTkrsRef" />
  <VolverComponent />
  <div class="position-absolute bottom-0 end-0">
    <MDBBtn class="botonCobrar" color="primary" @click="cobrar()">Pagar</MDBBtn>
  </div>
</template>

<script>
import { computed, provide, ref } from "vue";
import CambioComponent from "../components/cobro/CambioComponent.vue";
import VolverComponent from "../components/Volver.vue";
import ModalTkrsComponent from "../components/cobro/ModalTkrsComponent.vue";
import Swal from "sweetalert2";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBIcon,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "CobroView",
  components: {
    CambioComponent,
    MDBCard,
    MDBBtn,
    MDBCardBody,
    MDBCardText,
    VolverComponent,
    ModalTkrsComponent,
    MDBIcon,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const formaPago = ref("TARJETA");
    const modalTkrsRef = ref(null);
    const cambioRef = ref(null);
    const cantidadTkrs = ref(0);
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const trabajadorActivo = computed(() => {
      if (
        arrayTrabajadores.value &&
        indexTrabajadorActivo.value != undefined &&
        indexTrabajadorActivo.value != null &&
        arrayTrabajadores.value[indexTrabajadorActivo.value]
      ) {
        return arrayTrabajadores.value[indexTrabajadorActivo.value];
      }
      return null;
    });

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

    function setTkrs(cantidad) {
      cantidadTkrs.value = Number(cantidad);
      cambioRef.value.setTkrs(cantidad);
      if (cantidad >= getTotal(cesta.value)) {
        formaPago.value = "TKRS";
      } else {
        formaPago.value = "EFECTIVO";
      }
    }

    function setFormaPago(forma) {
      if (cantidadTkrs.value < getTotal(cesta.value)) {
        if (forma === "TARJETA" && cantidadTkrs.value > 0) {
          Swal.fire(
            "Oops...",
            "De momento el Ticket Restaurant solo se puede combinar con EFECTIVO",
            "error"
          );
        } else {
          formaPago.value = forma;
        }
      } else {
        Swal.fire(
          "¡Eo!",
          "El ticket resturant ya cubre el total de la venta",
          "error"
        );
      }
    }

    async function cobrar() {
      try {
        const resultado = await axios.post("tickets/crearTicket", {
          total: getTotal(cesta.value),
          idCesta: cesta.value._id,
          idTrabajador: trabajadorActivo.value._id,
          tipo: formaPago.value,
          tkrsData: {
            cantidadTkrs: cantidadTkrs.value,
            formaPago: "EFECTIVO",
          },
        });

        if (!resultado.data) {
          throw Error("No se ha podido crear el ticket");
        } else {
          Swal.fire({
            icon: "success",
            title: "Venta registrada correctamente",
            showConfirmButton: false,
            timer: 1200,
          });
          if (formaPago.value === "TARJETA")
            store.dispatch("Datafono/setEstado", "PENDIENTE");
          router.push("/main");
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    // function getTipo(modoCesta) {
    //   switch (modoCesta) {
    //     case "VENTA":
    //       return "EFECTIVO";
    //     case "CONSUMO_PERSONAL":
    //       return modoCesta;
    //     case "DEVOLUCION":
    //       throw Error("CASO ESPECIAL DEVOLUCIONES");
    //   }
    // }

    function getTotal(cesta) {
      return (
        cesta.detalleIva.importe1 +
        cesta.detalleIva.importe2 +
        cesta.detalleIva.importe3
      );
    }

    provide("total", getTotal(cesta.value));
    provide("setTkrs", setTkrs);

    return {
      cesta,
      getTotal,
      cobrar,
      formaPago,
      modalTkrsRef,
      cambioRef,
      setFormaPago,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoCardTkrs: 26rem;
$altoCardTkrs: 20rem;
.cardTicketRestaurante {
  max-width: $anchoCardTkrs;
  min-width: $anchoCardTkrs;
  max-height: $altoCardTkrs;
  min-height: $altoCardTkrs;
}

.botonCobrar {
  font-size: 2.5rem;
}
</style>
