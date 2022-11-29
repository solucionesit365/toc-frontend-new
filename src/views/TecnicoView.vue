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
        @click="descargarTicketInfo()"
        >Descargar info. ticket finales</MDBBtn
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
      <MDBBtn color="primary" size="lg" class="w-100"
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
      <MDBBtn
        color="primary"
        size="lg"
        class="w-100"
        @click="actualizarParametros()"
        >Actualizar parametros GDT</MDBBtn
      >
    </div>
    <div class="row mt-2">
      <MDBBtn color="primary" size="lg" class="w-100" @click="goToDoctor()"
        >Toc Doctor</MDBBtn
      >
    </div>
  </div>
  <VolverComponent />
</template>

<script>
import VolverComponent from "../components/Volver.vue";
import { MDBBtn } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import axios from "axios";

export default {
  name: "TecnicoView",
  components: {
    VolverComponent,
    MDBBtn,
  },
  setup() {
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

    function actualizarTeclados() {
      console.log("actualizarTeclados");
    }

    function imprimirTest() {
      console.log("imprimirTest");
    }

    function cambiarPrecio() {
      console.log("cambiarPrecio");
    }

    function actualizarParametros() {
      console.log("actualizarParametros");
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
