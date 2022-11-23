<template>
  <MDBModal
    id="modalArticulos"
    tabindex="-1"
    labelledby="tituloModalArticulos"
    v-model="modalArticulos"
    size="xl"
  >
    <MDBModalBody>
      <div class="row mt-1 p-4">
        <div class="col-md-8">
          <input
            class="form-control inputBusqueda w-100"
            type="text"
            placeholder="Buscar por nombre de artículo"
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
      <div v-if="arrayArticulos?.length > 0" class="row">
        <div class="col">
          <div class="table-responsive w-100" style="height: 400px">
            <table class="table table-striped mt-1">
              <tbody>
                <tr
                  v-for="(articulo, index) of arrayArticulos"
                  v-bind:key="index"
                >
                  <td>
                    <span class="textoNombre d-inline-block text-truncate">{{
                      articulo.nombre
                    }}</span>
                  </td>
                  <td>
                    <MDBBtn
                      color="primary"
                      size="lg"
                      @click="selectArticulo(articulo.id, articulo.nombre)"
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
  name: "ModalArticulosComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
  },
  setup(_props, context) {
    const store = useStore();
    const modalArticulos = ref(false);
    const datoBorrar = ref(0);
    const inputBusqueda = ref("");
    const arrayArticulos = ref();
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
      modalArticulos.value = true;
    }

    function test() {
      datoBorrar.value++;
    }

    function selectArticulo(idArticulo) {
      if (arrayCestas.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (trabajadorActivo.value.idCesta === arrayCestas.value[i]._id) {
            store.dispatch("Cestas/setClienteCesta", {
              index: i,
              idArticulo: idArticulo,
            });
            store.dispatch("EstadoDinamico/setVistaCliente", true);

            modalArticulos.value = false;
            break;
          }
        }
      }
    }

    function buscar() {
      axios
        .post("articulos/buscar", { busqueda: inputBusqueda.value })
        .then((res) => {
          arrayArticulos.value = res.data;
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
      modalArticulos,
      inputBusqueda,
      arrayArticulos,
      selectArticulo,
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
