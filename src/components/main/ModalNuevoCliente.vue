<template>
  <MDBModal
    id="modalNuevoCliente"
    tabindex="-1"
    labelledby="tituloModalClientes"
    v-model="modalNuevoCliente"
    staticBackdrop
    size="xl"
  >
    <MDBModalBody>
      <div class="row mt-1 p-4">
        <div class="col-md-8">
          <input
            class="form-control inputNombreCliente w-100"
            type="text"
            placeholder="Nombre del cliente"
            aria-label=".form-control-lg example"
            v-model="inputNombreCliente"
          />
        </div>
        <div class="col-md-4">
          <MDBBtn color="secondary" class="botonBusqueda w-100" disabled
            >Nombre</MDBBtn
          >
        </div>
      </div>
      <div class="row p-4">
        <div class="col-md-8">
          <input
            class="form-control inputNombreCliente w-100"
            type="text"
            placeholder="Código tarjeta"
            aria-label=".form-control-lg example"
            v-model="inputCodigoTarjeta"
          />
        </div>
        <div class="col-md-4 sizeModalClientes">
          <MDBBtn color="secondary" class="botonBusqueda w-100" disabled
            >Cód. tarjeta</MDBBtn
          >
        </div>
      </div>
      <div class="row">
        <div class="d-inline-block text-end">
          <MDBBtn
            color="primary"
            class="ms-2 sizeBotones"
            @click="crearCliente()"
            >Crear</MDBBtn
          >
          <MDBBtn
            color="danger"
            class="ms-2 sizeBotones"
            @click="modalNuevoCliente = false"
            >Atrás</MDBBtn
          >
        </div>
      </div>
    </MDBModalBody>
  </MDBModal>
</template>

<script>
import axios from "axios";
import { MDBModal, MDBModalBody, MDBBtn } from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import { ref } from "vue";

export default {
  name: "ModalNuevoClienteComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, context) {
    const modalNuevoCliente = ref(false);
    const inputNombreCliente = ref("");
    const inputCodigoTarjeta = ref("");

    function abrirModal() {
      modalNuevoCliente.value = true;
    }

    function crearCliente() {
      axios
        .post("clientes/crearNuevoCliente", {
          idTarjetaCliente: inputCodigoTarjeta.value,
          nombreCliente: inputNombreCliente.value,
        })
        .then((res) => {
          if (res.data) {
            Swal.fire({
              icon: "success",
              title: "Cliente creado correctamente",
              showConfirmButton: false,
              timer: 2000,
            });
            modalNuevoCliente.value = false;
          } else {
            throw Error("No se ha podido crear el cliente. backend");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    context.expose({
      abrirModal,
    });

    return {
      inputCodigoTarjeta,
      modalNuevoCliente,
      inputNombreCliente,
      crearCliente,
    };
  },
};
</script>

<style lang="scss" scoped>
$altoBotones: 4rem;
$anchoBotones: 13rem;
$sizeFuenteBotones: 2rem;
$anchoInputBusqueda: 44rem;
$altoInputBusqueda: 3.85rem;
$altoBotonBusqueda: 4rem;
$sizeFuenteBusqueda: 2rem;
$sizeFuenteResultados: 2rem;
.sizeBotones {
  min-height: $altoBotones;
  max-height: $altoBotones;
  min-width: $anchoBotones;
  max-width: $anchoBotones;
  font-size: $sizeFuenteBotones;
}

.inputNombreCliente {
  max-width: $anchoInputBusqueda;
  min-width: $anchoInputBusqueda;
  max-height: $altoInputBusqueda;
  min-height: $altoInputBusqueda;
  font-size: $sizeFuenteBusqueda;
}

.botonBusqueda {
  min-height: $altoBotonBusqueda;
  max-height: $altoBotonBusqueda;

  font-size: $sizeFuenteBotones;
}

.textoNombre {
  font-size: $sizeFuenteResultados;
  max-width: 42rem;
}

.sinResultados {
  height: 20rem;
}

.textoSinResultados {
  font-size: 3rem;
  font-weight: bold;
}

.sizeModalClientes {
  max-height: 17rem;
  min-height: 17rem;
}
</style>
