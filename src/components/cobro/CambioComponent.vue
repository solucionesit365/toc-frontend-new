<template>
  <div class="row mt-2">
    <div class="col-md-3">
      <MDBCard class="cardInfoCambio">
        <MDBCardBody>
          <MDBCardTitle>Información cambio</MDBCardTitle>
          <MDBCardText>
            <li
              class="sizeLetrasCambio"
              v-if="cantidadTkrs != null && cantidadTkrs != undefined"
            >
              Dinero recibido:
              {{ Number(totalRecibido + cantidadTkrs).toFixed(2) }} €
            </li>
            <li class="sizeLetrasCambio">
              Dinero a pagar:
              {{ (Math.round(aPagar * 100) / 100).toFixed(2) }} €
            </li>
            <li
              v-if="cuenta != null && cuenta != undefined && cuenta > 0"
              class="estiloFalta sizeLetrasCambio"
            >
              Faltan {{ (Math.round(cuenta * 100) / 100).toFixed(2) }} €
            </li>
            <li
              v-if="cuenta != null && cuenta != undefined && cuenta == 0"
              class="estiloPerfecto sizeLetrasCambio"
            >
              Cambio perfecto
            </li>
            <li
              v-if="cuenta != null && cuenta != undefined && cuenta < 0"
              class="estiloSobra sizeLetrasCambio"
            >
              Sobran
              {{
                (Math.round((aPagar - totalRecibido) * 100) / 100).toFixed(2)
              }}
              €
            </li>
          </MDBCardText>
          <MDBBtn
            size="lg"
            color="warning"
            @click="deshacer()"
            class="sizeBotones"
            >Deshacer</MDBBtn
          >
          <MDBBtn
            size="lg"
            color="danger"
            class="sizeBotones"
            @click="limpiar()"
            >Limpiar</MDBBtn
          >
        </MDBCardBody>
      </MDBCard>
    </div>
    <div class="col-md-9">
      <div class="row">
        <div class="col text-end">
          <img src="/img/1cts.png" class="sizeMonedas" @click="sumar(0.01)" />
          <img src="/img/2cts.png" class="sizeMonedas" @click="sumar(0.02)" />
          <img src="/img/5cts.png" class="sizeMonedas" @click="sumar(0.05)" />
          <img src="/img/10cts.png" class="sizeMonedas" @click="sumar(0.1)" />
          <img src="/img/20cts.png" class="sizeMonedas" @click="sumar(0.2)" />
          <img src="/img/50cts.png" class="sizeMonedas" @click="sumar(0.5)" />
          <img src="/img/uneuro.png" class="sizeMonedas" @click="sumar(1)" />
          <img src="/img/doseuros.png" class="sizeMonedas" @click="sumar(2)" />
        </div>
      </div>

      <div class="row mt-2">
        <div class="col text-end">
          <img src="/img/5euros.png" class="sizeBilletes" @click="sumar(5)" />
          <img src="/img/10euros.png" class="sizeBilletes" @click="sumar(10)" />
          <img src="/img/20euros.png" class="sizeBilletes" @click="sumar(20)" />
          <img src="/img/50euros.png" class="sizeBilletes" @click="sumar(50)" />
          <img
            src="/img/100euros.png"
            class="sizeBilletes"
            @click="sumar(100)"
          />
          <img
            src="/img/200euros.png"
            class="sizeBilletes"
            @click="sumar(200)"
          />
          <img
            src="/img/500euros.png"
            class="sizeBilletes"
            @click="sumar(500)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, inject, computed } from "vue";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-vue-ui-kit";
export default {
  name: "CambioComponent",
  components: {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const totalRecibido = ref(0);
    const total = inject("total");
    const aPagar = ref(total);
    const historial = ref([]);
    const cantidadTkrs = ref(0);
    const cuenta = computed(() => {
      if (aPagar.value - cantidadTkrs.value < 0) {
        return 0;
      } else {
        return aPagar.value - (totalRecibido.value + cantidadTkrs.value);
      }
    });

    function sumar(x) {
      totalRecibido.value += x;
      historial.value.push(x);
    }

    function deshacer() {
      historial.value.pop();
      let suma = 0;
      historial.value.forEach((numero) => {
        suma += numero;
      });
      totalRecibido.value = suma;
    }

    function limpiar() {
      totalRecibido.value = 0;
      historial.value = [];
    }

    function setTkrs(x) {
      cantidadTkrs.value = Number(x);
    }

    expose({
      setTkrs,
    });

    return {
      sumar,
      totalRecibido,
      aPagar,
      deshacer,
      limpiar,
      cantidadTkrs,
      cuenta,
    };
  },
};
</script>

<style lang="scss" scoped>
.sizeBilletes {
  max-width: 120px;
  margin-left: 1rem;
}
.sizeMonedas {
  max-width: 100px;
  margin-left: 1rem;
}
.sizeBotones {
  max-width: 9.6rem;
  min-width: 9.6rem;
}
.estiloFalta {
  color: rgb(238, 103, 103);
  font-weight: bold;
}
.estiloSobra {
  color: rgb(240, 189, 95);
  font-weight: bold;
}
.estiloPerfecto {
  color: rgb(125, 211, 125);
  font-weight: bold;
}
.sizeLetrasCambio {
  font-size: 1.5rem;
}
.cardInfoCambio {
  max-width: 23rem;
  min-width: 23rem;
}
</style>
