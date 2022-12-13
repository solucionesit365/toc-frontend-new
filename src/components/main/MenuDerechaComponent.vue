<template>
  <div class="row">
    <span
      v-if="trabajadorActivo"
      class="nombreTrabajador text-center d-inline-block text-truncate"
      >{{ trabajadorActivo.nombreCorto }}</span
    >
    <span
      class="nombreMesa d-inline-block text-truncate"
      v-if="
        cesta && cesta.indexMesa && arrayMesas && arrayMesas[cesta.indexMesa]
      "
      >Mesa {{ arrayMesas[cesta.indexMesa].nombre }}</span
    >
  </div>
  <div class="row">
    <MDBBtn v-if="estadoDatafono === ''" outline="primary" class="botonEstado">
      <span class="disponible">Datáfono disponible</span>
    </MDBBtn>
    <MDBBtn
      v-if="estadoDatafono === 'AGAIN'"
      outline="warning"
      class="botonEstado"
      @click="tarjetaUltimoTicket()"
    >
      <span class="again">Reintentar pago</span>
    </MDBBtn>
    <img
      v-if="estadoDatafono === 'PENDIENTE'"
      src="pay-loading.svg"
      alt="Procesando pago"
      width="200"
      height="60"
    />
    <div
      v-if="estadoDatafono === 'APROBADA'"
      class="d-inline text-center caritasContentas grupoContento pt-1"
    >
      <MDBIcon class="d-inline" icon="grin-alt" iconStyle="far" size="3x" />
      <MDBIcon
        class="d-inline ms-2"
        icon="grin-alt"
        iconStyle="far"
        size="3x"
      />
      <MDBIcon
        class="d-inline ms-2"
        icon="grin-alt"
        iconStyle="far"
        size="3x"
      />
      <MDBIcon
        class="d-inline ms-2"
        icon="grin-alt"
        iconStyle="far"
        size="3x"
      />
    </div>
    <div
      v-if="estadoDatafono === 'DENEGADA'"
      class="d-inline text-center caritasTristes grupoTriste pt-1"
    >
      <MDBIcon class="d-inline" icon="frown" iconStyle="far" size="3x" />
      <MDBIcon class="d-inline ms-2" icon="frown" iconStyle="far" size="3x" />
      <MDBIcon class="d-inline ms-2" icon="frown" iconStyle="far" size="3x" />
      <MDBIcon class="d-inline ms-2" icon="frown" iconStyle="far" size="3x" />
    </div>
  </div>
  <div class="row mt-1">
    <MDBBtn
      v-if="cesta && getTotal(cesta) > 0"
      outline="primary"
      class="botonPagar"
      @click="handleCobro()"
    >
      <MDBIcon icon="hand-holding-usd" size="5x" />
      <span class="letraTotal ms-3 mt-2">
        {{ getTotal(cesta).toFixed(2) }} €
      </span>
    </MDBBtn>

    <MDBBtn
      v-if="cesta && getTotal(cesta) === 0"
      outline="primary"
      class="botonPagar"
      @click="abrirCajon()"
    >
      <MDBIcon icon="hand-holding-usd" size="5x" />
    </MDBBtn>
    <span class="text-end fst-italic informacion"
      >Tienda (t-000) Empresa (Tena) Versión (4.0)</span
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref, inject } from "vue";
import { MDBIcon, MDBBtn } from "mdb-vue-ui-kit";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

export default {
  name: "MenuDerechaComponent",
  components: {
    MDBIcon,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const arrayMesas = ref([]);
    const resetGeneral = inject("resetGeneral");
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const estadoDatafono = computed(() => store.state.Datafono.estado);
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
            arrayTrabajadores.value &&
            arrayTrabajadores.value[indexTrabajadorActivo.value] &&
            arrayCestas.value[i]._id ==
              arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    function getTotal(cesta) {
      return (
        cesta.detalleIva.importe1 +
        cesta.detalleIva.importe2 +
        cesta.detalleIva.importe3
      );
    }

    function actualizarMesas() {
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
    }

    function goTo(url) {
      router.push(url);
    }

    function abrirCajon() {
      Swal.fire("en construcción", "cosa en construcción", "info");
    }

    function tarjetaUltimoTicket() {
      axios
        .post("paytef/cobrarUltimoTicket", {
          idTrabajador: trabajadorActivo.value._id,
        })
        .then(() => {
          store.dispatch("Datafono/setEstado", "PENDIENTE");
        })
        .catch((err) => {
          Swal.fire("Oops...", err.message, "error");
        });
    }

    async function handleCobro() {
      if (cesta.value) {
        if (cesta.value.modo === "VENTA") {
          if (cesta.value.idCliente && cesta.value.idCliente != "") {
            const cliente = (
              await axios.post("clientes/getClienteById", {
                idCliente: cesta.value.idCliente,
              })
            ).data;
            if (cliente?.albaran === true && cliente?.noPagaEnTienda === true) {
              axios
                .post("tickets/crearTicket", {
                  total: getTotal(cesta.value),
                  idCesta: cesta.value._id,
                  idTrabajador: trabajadorActivo.value._id,
                  tipo: "DEUDA",
                  tkrsData: null,
                })
                .then((resDeuda) => {
                  if (resDeuda.data) {
                    Swal.fire({
                      icon: "success",
                      title: "Venta modo deuda registrada correctamente",
                      showConfirmButton: false,
                      timer: 2000,
                    });
                  } else {
                    throw Error(
                      "No se ha podido registrar la venta en modo deuda"
                    );
                  }
                })
                .catch((err) => {
                  Swal.fire("Oops...", err.message, "error");
                });
            } else {
              goTo("/cobro");
            }
          } else {
            goTo("/cobro");
          }
        } else if (cesta.value.modo === "DEVOLUCION") {
          axios
            .post("devoluciones/nuevaDevolucion", {
              total: getTotal(cesta.value),
              idCesta: cesta.value._id,
              idTrabajador: trabajadorActivo.value._id,
            })
            .then((res) => {
              if (res.data) {
                resetGeneral();
                Swal.fire({
                  icon: "success",
                  title: "Devolución creada correctamente",
                  showConfirmButton: false,
                  timer: 2000,
                });
              } else {
                throw Error("No se ha podido crear la devolución");
              }
            })
            .catch((err) => {
              Swal.fire("Oops...", err.message, "error");
            });
        } else if (cesta.value.modo === "CONSUMO_PERSONAL") {
          axios
            .post("tickets/crearTicket", {
              total: getTotal(cesta.value),
              idCesta: cesta.value._id,
              idTrabajador: trabajadorActivo.value._id,
              tipo: "CONSUMO_PERSONAL",
            })
            .then((resCrearTicket) => {
              if (resCrearTicket.data) {
                resetGeneral();
                Swal.fire({
                  icon: "success",
                  title: "Consumo personal registrado",
                  showConfirmButton: false,
                  timer: 1200,
                });
              } else {
                throw Error(
                  "No se ha podido crear el ticket de consumo personal"
                );
              }
            })
            .catch((err) => {
              Swal.fire("Oops...", err.message, "error");
            });
        }
      } else {
        Swal.fire("Oops...", "El modo de la cesta es incorrecto", "error");
      }
    }

    onMounted(() => {
      actualizarMesas();
    });

    return {
      trabajadorActivo,
      estadoDatafono,
      cesta,
      arrayMesas,
      getTotal,
      goTo,
      abrirCajon,
      tarjetaUltimoTicket,
      handleCobro,
    };
  },
};
</script>

<style lang="scss" scoped>
$anchoBotonPagar: 20.8rem;
$altoBotonPagar: 6rem;
$anchoBotonEstado: 20.8rem;
$altoBotonEstado: 3.5rem;
.nombreTrabajador {
  font-size: 1.5rem;
  font-weight: bold;
}
.botonPagar {
  min-width: $anchoBotonPagar;
  max-width: $anchoBotonPagar;
  min-height: $altoBotonPagar;
  max-height: $altoBotonPagar;
}
.botonEstado {
  min-width: $anchoBotonEstado;
  max-width: $anchoBotonEstado;
  min-height: $altoBotonEstado;
  max-height: $altoBotonEstado;
}
.letraTotal {
  font-size: 3.5rem;
  font-weight: bold;
  // display: inline-block !important;
  // vertical-align: top;
}
.disponible {
  color: #00c919;
  font-weight: bold;
  font-size: 1rem;
}
.again {
  color: #000000;
  font-weight: bold;
  font-size: 1.3rem;
}
.fotoProcesandoPago {
  display: inline-block !important;
  vertical-align: top;
}
.informacion {
  font-size: 1rem;
}
.nombreMesa {
  text-align: center;
  font-weight: bold;
}
.caritasContentas {
  background-color: #85ff94;
}
.caritasTristes {
  background-color: #ff9575;
}
.grupoTriste {
  min-width: $anchoBotonEstado;
  max-width: $anchoBotonEstado;
  min-height: $altoBotonEstado;
  max-height: $altoBotonEstado;
}
.grupoContento {
  min-width: $anchoBotonEstado;
  max-width: $anchoBotonEstado;
  min-height: $altoBotonEstado;
  max-height: $altoBotonEstado;
}
</style>
