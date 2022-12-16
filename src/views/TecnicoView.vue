<template>
  <div class="w-50 mx-auto">
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="descargarClientesFinales()"
        >Descargar clientes finales</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="descargarTarifasEspeciales()"
        >Descargar tarifas especiales</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="actualizarParametros()"
        >Actualizar parámetros tienda</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="actualizarTrabajadores()"
        >Actualizar trabajadores</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="actualizarTeclados()"
        >Actualizar teclado</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        v-if="modalImpresoraRef"
        @click="modalImpresoraRef.abrirModal()"
        >Config. VID y PID impresora, Visor</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100">Config. IP Paytef</MDBBtn>
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100" @click="imprimirTest()"
        >Imprimir test</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100" @click="cambiarPrecio()"
        >Editar productos</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100">Listado de ventas</MDBBtn>
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100" @click="goToDoctor()"
        >Toc Doctor</MDBBtn
      >
    </div>
  </div>
  <VolverComponent />
  <ModalImpresoraComponent ref="modalImpresoraRef" />
</template>

<script>
import VolverComponent from "../components/Volver.vue";
import { MDBBtn } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import axios from "axios";
import ModalImpresoraComponent from "../components/tecnico/ModalImpresoraComponent.vue";
import { ref } from "vue";

export default {
  name: "TecnicoView",
  components: {
    VolverComponent,
    ModalImpresoraComponent,
    MDBBtn,
  },
  setup() {
    const modalImpresoraRef = ref(null);

    function descargarClientesFinales() {
      axios
        .post("clientes/descargarClientesFinales")
        .then((res) => {
          if (res.data) {
            Swal.fire(
              "OK",
              "Clientes finales actualizados correctamente",
              "success"
            );
          } else {
            throw Error("No se han podido descargar los clientes finales");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function descargarTicketInfo() {
      console.log("descargarTicketInfo");
    }

    function descargarTarifasEspeciales() {
      axios
        .get("tarifas/descargarTarifas")
        .then((res) => {
          if (res.data) {
            Swal.fire(
              "OK",
              "Tarifas especiales descargadas correctamente",
              "success"
            );
          } else {
            throw Error("No se han podido descargar las tarifas especiales");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function actualizarTrabajadores() {
      console.log("actualizarTrabajadores");
    }

    /* Eze 4.0 */
    function actualizarTeclados() {
      axios
        .post("teclado/actualizarTeclado")
        .then((res) => {
          if (res.data) {
            Swal.fire("OK", "Teclado actualizado correctamente", "success");
            document.location.href = "http://localhost:3000";
          } else {
            throw Error("No se ha podido actualizar el teclado");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function imprimirTest() {
      console.log("imprimirTest");
    }

    function cambiarPrecio() {
      console.log("cambiarPrecio");
    }

    function actualizarParametros() {
      axios
        .get("parametros/actualizarParametros")
        .then((res) => {
          if (res.data) {
            Swal.fire("OK", "Parámetros actualizados correctamente", "success");
            document.location.href = "http://localhost:3000";
          } else {
            throw Error("No se han podido actualizar los parámetros");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function goToDoctor() {
      console.log("goToDoctor");
    }
    return {
      descargarClientesFinales,
      descargarTarifasEspeciales,
      descargarTicketInfo,
      actualizarTrabajadores,
      actualizarTeclados,
      imprimirTest,
      cambiarPrecio,
      actualizarParametros,
      goToDoctor,
      modalImpresoraRef,
    };
  },
};
</script>

<style lang="scss" scoped></style>
