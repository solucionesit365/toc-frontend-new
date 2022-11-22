<template>
  <MDBModal
    id="modalClientes"
    tabindex="-1"
    labelledby="tituloModalClientes"
    v-model="modalClientes"
    staticBackdrop
    size="xl"
  >
    <MDBModalBody>
      <div class="row">
        <div class="d-inline-block text-center">
          <MDBBtn color="warning" class="sizeBotones">Glovo</MDBBtn>
          <MDBBtn color="dark" class="ms-2 sizeBotones">Uber</MDBBtn>
          <MDBBtn color="primary" class="ms-2 sizeBotones">To Go</MDBBtn>
          <MDBBtn color="success" class="ms-2 sizeBotones">Nuevo</MDBBtn>
          <MDBBtn
            color="danger"
            class="ms-2 sizeBotones"
            @click="modalClientes = false"
            >Salir</MDBBtn
          >
        </div>
      </div>
      <div class="row mt-1 p-4">
        <div class="col-md-8">
          <input
            class="form-control inputBusqueda w-100"
            type="text"
            placeholder="Buscar por nombre"
            aria-label=".form-control-lg example"
            v-model="inputBusqueda"
          />
        </div>
        <div class="col-md-4">
          <MDBBtn
            color="secondary"
            class="botonBusqueda w-100"
            @click="buscar()"
            >Buscar</MDBBtn
          >
        </div>
      </div>
      <div v-if="arrayClientes?.length > 0" class="row">
        <div class="col">
          <div class="table-responsive w-100" style="height: 400px">
            <table class="table table-striped mt-1">
              <tbody>
                <tr
                  v-for="(cliente, index) of arrayClientes"
                  v-bind:key="index"
                >
                  <td>
                    <span class="textoNombre d-inline-block text-truncate">{{
                      cliente.nombre
                    }}</span>
                  </td>
                  <td>
                    <MDBBtn
                      color="primary"
                      size="lg"
                      @click="selectCliente(cliente.id, cliente.nombre)"
                      class="w-100"
                      style="height: 3.85rem; font-size: 1.5rem"
                      >Seleccionar</MDBBtn
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-else class="row">
        <div class="sinResultados position-relative">
          <span
            class="textoSinResultados position-absolute top-50 start-50 translate-middle"
            >Sin resultados</span
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
import {
  ref,
  // inject,
  onMounted,
  watch,
  computed,
} from "vue";
import { useStore } from "vuex";

export default {
  name: "ModalClientesComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, context) {
    const store = useStore();
    const modalClientes = ref(false);
    const datoBorrar = ref(0);
    const inputBusqueda = ref("");
    const arrayClientes = ref();
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
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
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);

    function abrirModal() {
      modalClientes.value = true;
    }

    function test() {
      datoBorrar.value++;
    }

    function selectCliente(idCliente, nombreCliente) {
      if (arrayCestas.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (trabajadorActivo.value.idCesta === arrayCestas.value[i]._id) {
            store.dispatch("Cestas/setClienteCesta", {
              index: i,
              idCliente: idCliente,
              nombreCliente,
            });
            store.dispatch("EstadoDinamico/setVistaCliente", true);

            modalClientes.value = false;
            break;
          }
        }
      }
    }

    function buscar() {
      axios
        .post("clientes/buscar", { busqueda: inputBusqueda.value })
        .then((res) => {
          arrayClientes.value = res.data;
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    watch(inputBusqueda, () => {
      buscar();
    });

    context.expose({
      abrirModal,
      datoBorrar,
    });

    onMounted(() => {
      // doSomething("jajj");
      console.log("bienvenido a mi componente");
    });

    return {
      test,
      datoBorrar,
      modalClientes,
      inputBusqueda,
      arrayClientes,
      selectCliente,
      buscar,
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

.inputBusqueda {
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
</style>
