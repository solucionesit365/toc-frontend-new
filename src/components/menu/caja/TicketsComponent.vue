<template>
  <div class="col-md-7">
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
          <td>EFECTIVO</td>
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
    </div>
  </div>
</template>

<script>
import { MDBTable } from "mdb-vue-ui-kit";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import moment from "moment";
export default {
  name: "TicketsComponent",
  components: {
    MDBTable,
  },
  setup() {
    const store = useStore();
    const idActivo = ref(null);
    const ticketSeleccionado = ref(null);
    const arrayTickets = computed(() => {
      const aux = store.state.Caja.arrayVentas;
      return aux.reverse();
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
      // dataset1,
      // tablaTickets,
    };
  },
};
</script>

<style lang="scss" scoped>
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
</style>
