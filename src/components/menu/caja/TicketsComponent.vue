<template>
  <div>
    <MDBDatatable>
      <thead>
        <tr>
          <th class="th-sm">Número ticket</th>
          <th class="th-sm">Hora</th>
          <th class="th-sm">Forma de pago</th>
          <th class="th-sm">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) in arrayTickets" v-bind:key="index">
          <th scope="row">{{ ticket._id }}</th>
          <td>{{ getTiempo(ticket.timestamp) }}</td>
          <td>Otto</td>
          <td>{{ ticket.total }} €</td>
        </tr>
      </tbody>
    </MDBDatatable>
  </div>
</template>

<script>
import { MDBDatatable } from "mdb-vue-ui-kit";
import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";
export default {
  name: "TicketsComponent",
  components: {
    MDBDatatable,
  },
  setup() {
    const store = useStore();
    const arrayTickets = computed(() => store.state.Caja.arrayVentas);
    function getTiempo(x) {
      const fecha = new Date(x);
      return moment(fecha).format("HH:ss DD/MM/YYYY");
    }
    return {
      arrayTickets,
      getTiempo,
    };
  },
};
</script>

<style lang="scss" scoped></style>
