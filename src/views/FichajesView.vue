<template>
  <div class="row mt-2">
    <MDBCard @click="modalFichajes.abrirModal()" class="estiloCard ms-4">
      <MDBCardBody class="text-center">
        <MDBCardTitle>Iniciar turno</MDBCardTitle>
        <MDBIcon class="mt-3" icon="play" iconStyle="fas" size="6x" />
      </MDBCardBody>
    </MDBCard>
    <MDBCard @click="iniciarDescanso()" class="estiloCard ms-4">
      <MDBCardBody class="text-center">
        <MDBCardTitle>Iniciar descanso</MDBCardTitle>
        <MDBIcon class="mt-3" icon="pause" iconStyle="fas" size="6x" />
      </MDBCardBody>
    </MDBCard>
    <MDBCard @click="preguntarFinalizarTurno()" class="estiloCard ms-4">
      <MDBCardBody class="text-center">
        <MDBCardTitle>Finalizar turno</MDBCardTitle>
        <MDBIcon class="mt-3" icon="stop" iconStyle="fas" size="6x" />
      </MDBCardBody>
    </MDBCard>
  </div>

  <!-- @blur="resetidActivoDescansando" tabindex="0" -->
  <div class="row mt-4">
    <div
      v-if="arrayTrabajadoresDescanso && arrayTrabajadoresDescanso.length > 0"
      class="col tablaDescansando table-responsive d-inline"
      style="background-color: white"
    >
      <table class="table">
        <thead>
          <tr>
            <th class="tituloDescanso">Trabajadores en descanso activo</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(trabajador, index) of arrayTrabajadoresDescanso"
            v-bind:key="index"
            :class="{ activoTabla: trabajador._id === idActivoDescanso }"
            @click="setActivo(trabajador._id)"
          >
            <td>
              <span class="textoNombre d-inline-block text-truncate">{{
                trabajador.nombre
              }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col anchoCajaConsumoPersonal">
      <MDBBtn
        v-if="trabajadorActivo"
        @click="activarConsumoPersonal()"
        color="primary"
        class="w-100 botonConsumoPersonal"
        >Consumo personal</MDBBtn
      >
      <MDBBtn
        v-if="idActivoDescanso != null"
        @click="preguntarFinalDescanso()"
        color="primary"
        class="w-100 botonConsumoPersonal mt-4"
        >Finalizar descanso</MDBBtn
      >
    </div>
  </div>
  <FichajesModal ref="modalFichajes" />
</template>

<script>
import { tocGame } from "../services/tocGame";
import axios from "axios";
import {
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
} from "mdb-vue-ui-kit";
import Swal from "sweetalert2";
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import FichajesModal from "../components/menu/fichajes/FichajesModal.vue";
import router from "@/router";
export default {
  name: "fichajesView",
  components: {
    MDBIcon,
    FichajesModal,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const modalFichajes = ref(null);
    const arrayTrabajadoresDescanso = ref([]);
    const idActivoDescanso = ref(null);
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

    function setActivo(id) {
      idActivoDescanso.value = id;
    }

    function resetidActivoDescansando() {
      idActivoDescanso.value = null;
    }

    function finDeTurno() {
      axios
        .post("trabajadores/desfichar", {
          idTrabajador: trabajadorActivo.value._id,
        })
        .then((res) => {
          if (res.data) {
            tocGame.cargarTrabajadoresFichados();
            Swal.fire("OK", "Fin de turno registrado correctamente", "success");
          } else {
            throw Error(
              "Error, no se ha podido registrar el fin de turno (backend)"
            );
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function getTrabajadorDescanso(id) {
      for (let i = 0; i < arrayTrabajadoresDescanso.value.length; i++) {
        if (id === arrayTrabajadoresDescanso.value[i]._id) {
          return arrayTrabajadoresDescanso.value[i];
        }
      }
      return null;
    }

    function preguntarFinalDescanso() {
      if (idActivoDescanso.value) {
        const trabajador = getTrabajadorDescanso(idActivoDescanso.value);
        if (trabajador) {
          Swal.fire({
            title: "Por favor, confirma el descanso para: ",
            html: `${trabajador.nombre}`,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Confirmar",
          }).then((result) => {
            if (result.isConfirmed) {
              finalDescanso(idActivoDescanso.value);
            }
          });
        }
      }
    }

    async function activarConsumoPersonal() {
      if (arrayCestas.value && cesta.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (arrayCestas.value[i]._id === cesta.value._id) {
            await store.dispatch("Cestas/setModoCesta", {
              modo: "CONSUMO_PERSONAL",
              index: i,
            });
            router.push("/main");
            break;
          }
        }
      }
    }

    function preguntarFinalizarTurno() {
      if (trabajadorActivo.value) {
        Swal.fire({
          title: "Confirma. Fin de turno para: ",
          html: `${trabajadorActivo.value.nombre}`,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Confirmar",
        }).then((result) => {
          if (result.isConfirmed) {
            finDeTurno();
          }
        });
      }
    }

    function finalDescanso(idTrabajador) {
      axios
        .post("trabajadores/finDescanso", {
          idTrabajador,
        })
        .then((res) => {
          if (res.data) {
            tocGame.cargarTrabajadoresFichados();
            resetidActivoDescansando();
            actualizarDescansando();
            Swal.fire("Descanso finalizado", "", "success");
          } else {
            throw Error("Error, no se  ha podido iniciar el descanso");
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    function iniciarDescanso() {
      if (trabajadorActivo.value._id) {
        axios
          .post("trabajadores/inicioDescanso", {
            idTrabajador: trabajadorActivo.value._id,
          })
          .then((res) => {
            if (res.data) {
              actualizarDescansando();
              tocGame.cargarTrabajadoresFichados();
              Swal.fire("OK", "Descanso iniciado correctamente", "success");
            } else {
              throw Error("Error, no se ha podido iniciar el descanso");
            }
          })
          .catch((err) => {
            Swal.fire("Oops...", err.message, "error");
          });
      } else {
        Swal.fire(
          "Importante....",
          "Es necesario un trabajador activo para realizar esta acción",
          "warning"
        );
      }
    }

    function actualizarDescansando() {
      axios
        .get("trabajadores/descansando")
        .then((res) => {
          if (res.data) {
            arrayTrabajadoresDescanso.value = res.data;
          } else {
            throw Error(
              "Error, no se han podido obtener los trabajadores en descanso"
            );
          }
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    onMounted(() => {
      actualizarDescansando();
    });

    return {
      modalFichajes,
      arrayTrabajadoresDescanso,
      idActivoDescanso,
      setActivo,
      trabajadorActivo,
      finDeTurno,
      iniciarDescanso,
      preguntarFinalDescanso,
      resetidActivoDescansando,
      preguntarFinalizarTurno,
      activarConsumoPersonal,
    };
  },
};
</script>

<style lang="scss" scoped>
$ancho: 5.5rem;
$alto: 5rem;
$altoCard: 15rem;
$anchoCard: 22.5rem;
$sizeFuenteResultados: 2rem;
$altoTablaDescanso: 25rem;
$anchoTablaDescanso: 50rem;
.botonesAcciones {
  max-width: $ancho;
  min-width: $ancho;
  min-height: $alto;
  max-height: $alto;
}

.estiloCard {
  max-width: $anchoCard;
  min-width: $anchoCard;
  max-height: $altoCard;
  min-height: $altoCard;
}

.textoNombre {
  font-size: $sizeFuenteResultados;
  max-width: 42rem;
}

.tablaDescansando {
  max-height: $altoTablaDescanso;
  min-height: $altoTablaDescanso;
  max-width: $anchoTablaDescanso;
  min-width: $anchoTablaDescanso;
}

.activoTabla {
  background-color: #dfdfdf;
}
.botonConsumoPersonal {
  width: 10rem;
  height: 10rem;
  font-size: 2rem;
  font-weight: bold;
}

.anchoCajaConsumoPersonal {
  max-width: 25rem;
}

.tituloDescanso {
  font-size: $sizeFuenteResultados;
}

.sinCansados {
  min-height: 60rem;
  max-height: 60rem;
}
</style>
