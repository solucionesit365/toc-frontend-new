<template>
  <div class="col-md-7 listaTickets">
    <MDBTable hover>
      <thead>
        <tr>
          <th class="th-sm">Número ticket</th>
          <th class="th-sm">Hora</th>
          <th class="th-sm">Tipo pago</th>
          <th class="th-sm">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(ticket, index) in arrayTickets"
          v-bind:key="index"
          :class="{ 'table-active': ticket._id === idActivo }"
          @click="setActivo(ticket)"
        >
          <td>{{ ticket._id }}</td>
          <td>{{ getTiempo(ticket.timestamp) }}</td>
          <td>{{ ticket.tipoPago }}</td>
          <td>{{ ticket.total }} €</td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
  <div class="col-md-5" v-if="ticketSeleccionado">
    <div id="detalleTicket">
      <h2 class="text-center">Ticket {{ ticketSeleccionado._id }}</h2>
      <h6 class="text-center">{{ getTiempo(ticketSeleccionado.timestamp) }}</h6>
      <br />
      <hr />
      <table class="table">
        <tr>
          <th class="titulosTicket">Producto</th>
          <th class="titulosTicket">Subtotal</th>
          <th class="titulosTicket">Unidades</th>
        </tr>
        <tr
          v-for="(item, index) of ticketSeleccionado.lista"
          v-bind:key="{ index }"
        >
          <td>{{ item.nombre }}</td>
          <td>{{ item.subtotal.toFixed(2) }} €</td>
          <td>{{ item.unidades }}</td>
        </tr>
      </table>
      <hr />
      <!-- <p>Forma de pago: {{ ticketSeleccionado.tipoPago }}</p> -->
      <h1 class="text-center">Total: {{ ticketSeleccionado.total }}</h1>
      <MDBBtn
        v-if="ticketSeleccionado.tipoPago === 'EFECTIVO'"
        color="primary"
        class="w-100"
        size="lg"
        @click="pagarConTarjeta(ticketSeleccionado._id)"
        >Pagar con tarjeta</MDBBtn
      >
      <MDBBtn
        v-if="ticketSeleccionado.tipoPago === 'TARJETA'"
        color="danger"
        class="w-100"
        size="lg"
        @click="devolucionCliente(ticketSeleccionado._id)"
        >Devolución al cliente</MDBBtn
      >
    </div>
  </div>
</template>

<script>
import { MDBTable, MDBBtn } from "mdb-vue-ui-kit";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "TicketsComponent",
  components: {
    MDBTable,
    MDBBtn,
  },
  setup() {
    const store = useStore();
    const idActivo = ref(null);
    const ticketSeleccionado = ref(null);
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
    const arrayTickets = computed(() => {
      return store.state.Caja.arrayVentas;
    });

    // const dataset1 = ref({
    //   columns: ["Número ticket", "Hora", "Forma de pago", "Total"],
    //   rows: [],
    // });

    function getTiempo(x) {
      const fecha = new Date(x);
      return moment(fecha).format("HH:ss DD/MM/YYYY");
    }

    function setActivo(ticket) {
      idActivo.value = ticket._id;
      ticketSeleccionado.value = ticket;
    }

    function pagarConTarjeta(idTicket) {
      axios.post("paytef/cobrarConTarjeta", {
        idTicket,
        idTrabajador: trabajadorActivo.value._id,
      });
    }

    function devolucionCliente() {
      Swal.fire("Oops...", "En construcción", "info");
    }

    // watch(arrayTickets, () => {
    //   arrayTickets.value.forEach((ticket) => {
    //     dataset1.value.rows.push([ticket._id, 123456, "TARJETA", 69.69]);
    //   });
    // });

    onMounted(() => {
      // arrayTickets.value.forEach((ticket) => {
      //   setActivo(arra);
      // });
      if (arrayTickets.value && arrayTickets.value.length > 0) {
        setActivo(arrayTickets.value[0]);
      }
    });

    return {
      arrayTickets,
      getTiempo,
      setActivo,
      idActivo,
      ticketSeleccionado,
      pagarConTarjeta,
      devolucionCliente,
      // dataset1,
      // tablaTickets,
    };
  },
};
</script>

<style lang="scss" scoped>
$sizeLista: 40rem !important;
#detalleTicket {
  font-family: Consolas, monaco, monospace;
  font-size: 14px;
  font-style: normal;
  font-variant: normal;
  font-weight: 700;
  line-height: 26.4px;
  margin: 1rem;
}
.titulosTicket {
  font-weight: bold;
  font-size: 18px;
}
.listaTickets {
  max-height: $sizeLista;
  min-height: $sizeLista;
  overflow-y: scroll;
}
</style>
