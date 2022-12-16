<template>
  <div class="row justify-content-center mt-4">
    <div class="col-7">
      <div class="card">
        <div class="card-header">
          <h4>Último cierre de caja</h4>
        </div>
        <div class="card-body">
          <div class="row row-2">
            <div class="col-6">
              <h6 class="text-center">Detalle</h6>
              <div class="card">
                <div class="card-body">
                  <div class="text-muted">
                    <div class="row row-2">
                      <div class="col-4">Resp:</div>
                      <div class="col-8 text-start">{{ name }}</div>

                      <div class="col-4">Inici:</div>
                      <div class="col-8 text-start">{{ inicioTime }}</div>

                      <div class="col-4">Final:</div>
                      <div class="col-8 text-start">{{ finalTime }}</div>

                      <div class="col-6 mb-2 mt-4">Calaix fet:</div>
                      <div class="col-4 mb-2 mt-4 text-start">
                        {{ calaixFetZ }}
                      </div>

                      <div class="col-6 mt-2">Descuadre:</div>
                      <div class="col-4 mt-2 text-start">{{ descuadre }}</div>

                      <div class="col-6 mt-2">Clients atessos:</div>
                      <div class="col-4 mt-2 text-start">{{ nClientes }}</div>

                      <div class="col-6 mt-2">Rescaudat:</div>
                      <div class="col-4 mt-2 text-start">{{ recaudado }}</div>

                      <div class="col-6 mt-2">Total 3G:</div>
                      <div class="col-4 mt-2 text-start">
                        {{ totalDatafono3G }}
                      </div>

                      <div class="col-6 mt-2">Canvi inicial:</div>
                      <div class="col-4 mt-2 text-start">
                        {{ cambioInicial }}
                      </div>

                      <div class="col-6 mt-2">Canvi final:</div>
                      <div class="col-4 mt-2 text-start">{{ cambioFinal }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-6 overflow-scroll">
              <h6 class="text-center">Moviments de Caixa</h6>
              <div
                class="card mb-2"
                v-for="(item, index) in moviments"
                v-bind:key="index"
              >
                <div class="card-body">
                  <div class="row row-2 text-muted">
                    <div class="col-4">Cantidad:</div>
                    <div class="col-6 text-start">{{ item.valor }}</div>
                    <div class="col-4">Fecha:</div>
                    <div class="col-6 text-start">{{ item.fecha }}</div>
                    <div class="col-4">Concepto:</div>
                    <div class="col-6 text-start">{{ item.concepto }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer text-center">
          <MDBBtn
            color="primary"
            class="w-50"
            size="lg"
            @click="imprimirUltimoCierre()"
            >Volver a imprimir cierre</MDBBtn
          >
          <!-- <button type="button" class="btn botonesPrincipales w-50">
            <i class="bi bi-printer-fill fs-3"></i>
          </button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  name: "VerUltimoCierreComponent",
  components: {
    MDBBtn,
  },
  setup() {
    const name = ref("");
    const inicioTime = ref(0);
    const finalTime = ref(0);
    const calaixFetZ = ref(0);
    const descuadre = ref(0);
    const totalDatafono3G = ref(0);
    const nClientes = ref(0);
    const moviments = ref([]);
    const cambioInicial = ref(0);
    const cambioFinal = ref(0);
    const recaudado = ref(0);
    const fecha = ref(0);
    const valor = ref(0);
    const concepto = ref("");

    function imprimirUltimoCierre() {
      axios.post("caja/imprimirUltimoCierre");
    }

    onMounted(() => {
      axios.get("caja/getUltimoCierre").then((caja) => {
        axios
          .post("trabajadores/getTrabajadorById", {
            id: caja.data.idDependientaCierre,
          })
          .then((trabajador) => {
            name.value = trabajador.data.nombre;
          });

        const fechaInicio = new Date(caja.data.inicioTime);
        const fechaFinal = new Date(caja.data.finalTime);

        inicioTime.value =
          fechaInicio.getDate() +
          "-" +
          fechaInicio.getMonth() +
          "-" +
          fechaInicio.getFullYear() +
          "  " +
          fechaInicio.getHours() +
          ":" +
          fechaInicio.getMinutes();
        finalTime.value =
          fechaFinal.getDate() +
          "-" +
          fechaFinal.getMonth() +
          "-" +
          fechaFinal.getFullYear() +
          "  " +
          fechaFinal.getHours() +
          ":" +
          fechaFinal.getMinutes();

        calaixFetZ.value = caja.data.calaixFetZ;
        totalDatafono3G.value = caja.data.totalDatafono3G;

        descuadre.value = caja.data.descuadre;
        nClientes.value = caja.data.nClientes;
        recaudado.value = caja.data.recaudado;
        cambioInicial.value = caja.data.totalApertura;
        cambioFinal.value = caja.data.totalCierre;

        axios
          .post("movimientos/getMovimientosIntervalo", {
            inicio: caja.data.inicioTime,
            final: caja.data.finalTime,
          })
          .then((arrayMoviments) => {
            if (arrayMoviments.data) {
              arrayMoviments.data.forEach((element) => {
                const fechamoviment = new Date(element._id);
                const date =
                  fechamoviment.getDate() +
                  "-" +
                  fechamoviment.getMonth() +
                  "-" +
                  fechamoviment.getFullYear() +
                  "  " +
                  fechamoviment.getHours() +
                  ":" +
                  fechamoviment.getMinutes();
                moviments.value.push({
                  fecha: date,
                  concepto: element.concepto,
                  valor: element.valor,
                });
              });
            }
          });
      });
    });

    return {
      name,
      inicioTime,
      finalTime,
      calaixFetZ,
      totalDatafono3G,
      descuadre,
      recaudado,
      nClientes,
      cambioInicial,
      cambioFinal,
      moviments,
      concepto,
      valor,
      fecha,
      imprimirUltimoCierre,
    };
  },
};
</script>

<style lang="scss" scoped></style>
