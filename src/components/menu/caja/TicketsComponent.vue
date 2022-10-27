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
          @click="setActivo(ticket._id)"
        >
          <td>{{ ticket._id }}</td>
          <td>{{ getTiempo(ticket.timestamp) }}</td>
          <td>EFECTIVO</td>
          <td>{{ ticket.total }} €</td>
        </tr>
      </tbody>
    </MDBTable>
  </div>
  <div class="col-md-5">{{ idActivo }}</div>
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

    function setActivo(x) {
      idActivo.value = x;
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
        setActivo(arrayTickets.value[0]._id);
      }
    });

    return {
      arrayTickets,
      getTiempo,
      setActivo,
      idActivo,
      // dataset1,
      // tablaTickets,
    };
  },
};
</script>

<style lang="scss" scoped></style>
