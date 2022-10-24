<template>
  <template v-if="arrayMesas.length > 0">
    <div class="row mt-2" v-for="(_row, y) in 5" v-bind:key="y">
      <div
        class="mesa ms-2"
        v-for="(_mesa, index) in 10"
        v-bind:key="index"
        @click="setIndexActivo(index + y * 10)"
        :class="[
          index === 0 ? 'ms-5' : '',
          index + y * 10 === indexMesaActiva
            ? 'border border-4 border-dark'
            : '',
          arrayMesas[index + y * 10].nombre ? 'habilitada' : 'deshabilitada',
        ]"
      >
        <span class="nombreMesa">{{ arrayMesas[index + y * 10].nombre }}</span>
      </div>
    </div>
  </template>

  <div class="position-relative footer">
    <div class="position-absolute bottom-0 start-0">
      <button
        @click="volver()"
        class="btn btn-warning ms-2"
        style="font-size: 27px"
      >
        Volver
      </button>
      <button
        @click="switchMesas()"
        class="btn btn-primary ms-2"
        style="font-size: 27px"
      >
        Vista cestas
      </button>
    </div>
    <div class="position-absolute bottom-0 end-0">
      <button
        v-if="
          arrayMesas &&
          indexMesaActiva != null &&
          indexMesaActiva != undefined &&
          arrayMesas[indexMesaActiva] &&
          arrayMesas[indexMesaActiva].nombre
        "
        @click="desactivarMesa()"
        class="btn btn-danger ms-2"
        style="font-size: 27px"
      >
        Eliminar mesa
      </button>
      <button
        v-else
        @click="activarMesa()"
        class="btn btn-success ms-2"
        style="font-size: 27px"
      >
        Activar mesa
      </button>
      <button
        v-if="
          arrayMesas &&
          indexMesaActiva != null &&
          indexMesaActiva != undefined &&
          arrayMesas[indexMesaActiva] &&
          arrayMesas[indexMesaActiva].nombre
        "
        @click="modalNombreMesa = true"
        class="btn btn-info ms-2"
        style="font-size: 27px"
      >
        Cambiar nombre
      </button>
    </div>
  </div>
  <MDBModal id="modalNombreMesa" tabindex="-1" v-model="modalNombreMesa">
    <MDBModalBody>
      <MDBInput
        label="Introduce el nombre de la mesa"
        size="lg"
        v-model="inputNombre"
      />
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" size="lg" @click="modalNombreMesa = false"
        >Cerrar</MDBBtn
      >
      <MDBBtn color="primary" size="lg" @click="cambiarNombre()"
        >Guardar cambios</MDBBtn
      >
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref, inject } from "vue";
import {
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBInput,
} from "mdb-vue-ui-kit";
export default {
  name: "MesasComponent",
  components: {
    MDBModal,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
    MDBInput,
  },
  setup() {
    const arrayMesas = ref([]);
    const indexMesaActiva = ref(0);
    const modalNombreMesa = ref(null);
    const inputNombre = ref("");

    function setIndexActivo(x) {
      indexMesaActiva.value = x;
    }

    async function crearCesta(indexMesa) {
      try {
        const resCrearCesta = (
          await axios.post("cestas/onlyCrearCestaParaMesa", {
            indexMesa,
          })
        ).data;
        if (resCrearCesta) {
          arrayMesas.value[indexMesa].idCesta = resCrearCesta;
          guardarCambios();
        } else {
          throw Error("No se ha podido crear la cesta para la nueva mesa");
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    function activarMesa() {
      if (
        arrayMesas.value &&
        indexMesaActiva.value != null &&
        indexMesaActiva.value != undefined &&
        arrayMesas.value[indexMesaActiva.value]
      ) {
        arrayMesas.value[indexMesaActiva.value] = {
          nombre: "Mesa " + (indexMesaActiva.value + 1),
        };
        crearCesta(indexMesaActiva.value);
      }
    }

    function desactivarMesa() {
      if (
        arrayMesas.value &&
        indexMesaActiva.value != null &&
        indexMesaActiva.value != undefined &&
        arrayMesas.value[indexMesaActiva.value]
      ) {
        axios
          .post("cestas/fulminarCesta", {
            idCesta: arrayMesas.value[indexMesaActiva.value].idCesta,
          })
          .then((resFulminarCesta) => {
            if (!resFulminarCesta.data) {
              throw Error("No se ha podido eliminar la cesta de la mesa");
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
          });
        arrayMesas.value[indexMesaActiva.value] = {
          nombre: null,
          idCesta: null,
        };

        guardarCambios();
      }
    }

    function cambiarNombre() {
      if (
        arrayMesas.value &&
        indexMesaActiva.value != null &&
        indexMesaActiva.value != undefined &&
        arrayMesas.value[indexMesaActiva.value]
      ) {
        arrayMesas.value[indexMesaActiva.value].nombre = inputNombre.value;
        modalNombreMesa.value = false;
        guardarCambios();
      }
    }

    function guardarCambios() {
      axios
        .post("mesas/guardarCambios", { arrayMesas: arrayMesas.value })
        .then((resGuardar) => {
          if (!resGuardar.data)
            throw Error("No se han podido guardar los cambios");
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    const volver = inject("volver");
    const switchMesas = inject("switchMesas");

    onMounted(() => {
      axios
        .get("mesas/getMesas")
        .then((resMesas) => {
          if (resMesas.data && resMesas.data.length === 50) {
            arrayMesas.value = resMesas.data;
          } else {
            throw Error("Error al obtener la configuración de mesas");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    });
    return {
      arrayMesas,
      indexMesaActiva,
      setIndexActivo,
      volver,
      switchMesas,
      activarMesa,
      desactivarMesa,
      cambiarNombre,
      modalNombreMesa,
      inputNombre,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoMesa: 7.5rem;
$altoMesa: 7.5rem;
$alturaFooter: 6rem;
.mesa {
  max-width: $anchoMesa;
  min-width: $anchoMesa;
  min-height: $altoMesa;
  max-height: $altoMesa;
}
.habilitada {
  background-color: rgb(152, 219, 136);
}
.deshabilitada {
  background-color: rgb(175, 175, 175);
}
.footer {
  max-height: $alturaFooter;
  min-height: $alturaFooter;
}
</style>
