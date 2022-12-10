<template>
  <div class="row p-2" style="text-align: center">
    <div class="col" @click="setActivo(0)">
      <img src="/img/1cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 0 }" class="unidadesSize">
        {{ infoDinero[0] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(1)">
      <img src="/img/2cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 1 }" class="unidadesSize">
        {{ infoDinero[1] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(2)">
      <img src="/img/5cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 2 }" class="unidadesSize">
        {{ infoDinero[2] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(3)">
      <img src="/img/10cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 3 }" class="unidadesSize">
        {{ infoDinero[3] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(4)">
      <img src="/img/20cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 4 }" class="unidadesSize">
        {{ infoDinero[4] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(5)">
      <img src="/img/50cts.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 5 }" class="unidadesSize">
        {{ infoDinero[5] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(6)">
      <img src="/img/uneuro.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 6 }" class="unidadesSize">
        {{ infoDinero[6] }} unidades
      </label>
    </div>
    <div class="col" @click="setActivo(7)">
      <img src="/img/doseuros.png" width="84" height="84" />
      <label :class="{ seleccionado: indexActivo == 7 }" class="unidadesSize">
        {{ infoDinero[7] }} unidades
      </label>
    </div>
  </div>
  <div class="row mx-auto mt-4">
    <div class="col" style="text-align: center" @click="setActivo(8)">
      <img src="/img/5euros.png" :width="sizeBilletes" /> <br />
      <label :class="{ seleccionado: indexActivo == 8 }" class="unidadesSize">
        {{ infoDinero[8] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(9)">
      <img src="/img/10euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 9 }" class="unidadesSize">
        {{ infoDinero[9] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(10)">
      <img src="/img/20euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 10 }" class="unidadesSize">
        {{ infoDinero[10] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(11)">
      <img src="/img/50euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 11 }" class="unidadesSize">
        {{ infoDinero[11] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(12)">
      <img src="/img/100euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 12 }" class="unidadesSize">
        {{ infoDinero[12] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(13)">
      <img src="/img/200euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 13 }" class="unidadesSize">
        {{ infoDinero[13] }} unidades
      </label>
    </div>
    <div class="col" style="text-align: center" @click="setActivo(14)">
      <img src="/img/500euros.png" :width="sizeBilletes" />
      <br />
      <label :class="{ seleccionado: indexActivo == 14 }" class="unidadesSize">
        {{ infoDinero[14] }} unidades
      </label>
    </div>
  </div>
  <div class="row">
    <div class="col-md-9">
      <MDBCard class="sizeInfoCaja">
        <MDBCardBody>
          <MDBCardTitle class="estiloTituloInfo"
            >Información de la caja</MDBCardTitle
          >
          <MDBCardText class="estiloInfoCaja sizeCajaInfo">
            <p>Total contado: {{ total }} euros</p>
            <p v-if="trabajadorActivo">
              Dependienta responsable: {{ trabajadorActivo.nombre }}
            </p>
          </MDBCardText>
          <MDBBtn
            color="primary"
            class="w-100"
            size="lg"
            @click="confirmarCierre()"
            >{{ modo }} caja</MDBBtn
          >
        </MDBCardBody>
      </MDBCard>
    </div>
    <div class="col-md-3 text-end">
      <NumpadComponent ref="numpadRef" />
    </div>
  </div>
  <MDBModal
    id="modalConfirmar"
    tabindex="-1"
    labelledby="modalConfirmarLabel"
    v-model="modalConfirmar"
  >
    <MDBModalHeader>
      <MDBModalTitle id="modalConfirmarLabel">
        Confirmación de cierre
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody>
      <div class="row">
        <div class="col">
          <div class="input-group input-group-lg">
            <span class="input-group-text" id="inputGroup-sizing-lg"
              >Datáfono manual</span
            >
            <input
              v-if="numpadRef2"
              type="text"
              class="form-control"
              v-model="numpadRef2.cantidad"
            />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col text-center">
          <NumpadComponent ref="numpadRef2" />
        </div>
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="secondary" @click="modalConfirmar = false" size="lg"
        >Cerrar</MDBBtn
      >
      <MDBBtn color="primary" size="lg" @click="cerrarCaja()"
        >Confirmar cierre</MDBBtn
      >
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import { ref, computed, provide, watch, onMounted } from "vue";
import NumpadComponent from "../../NumpadComponent.vue";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
  name: "CerrarCajaComponent",
  components: {
    NumpadComponent,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  },
  setup() {
    const indexActivo = ref(null);
    const sizeBilletes = "140";
    const cantidad3G = ref(0);
    const numpadRef = ref(null);
    const numpadRef2 = ref(null);
    const store = useStore();
    const router = useRouter();
    const infoDinero = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const modo = ref("Cerrar");
    const modalConfirmar = ref(null);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const trabajadorActivo = computed(() => {
      if (
        arrayTrabajadores.value &&
        indexTrabajadorActivo.value != null &&
        indexTrabajadorActivo.value != undefined &&
        arrayTrabajadores.value[indexTrabajadorActivo.value]
      ) {
        return arrayTrabajadores.value[indexTrabajadorActivo.value];
      }
      return null;
    });

    function setActivo(x) {
      indexActivo.value = x;
      numpadRef.value.setValor(infoDinero.value[x]);
    }

    const total = computed(() => {
      let suma = 0;
      suma += infoDinero.value[0] * 0.01;
      suma += infoDinero.value[1] * 0.02;
      suma += infoDinero.value[2] * 0.05;
      suma += infoDinero.value[3] * 0.1;
      suma += infoDinero.value[4] * 0.2;
      suma += infoDinero.value[5] * 0.5;
      suma += infoDinero.value[6] * 1;
      suma += infoDinero.value[7] * 2;
      suma += infoDinero.value[8] * 5;
      suma += infoDinero.value[9] * 10;
      suma += infoDinero.value[10] * 20;
      suma += infoDinero.value[11] * 50;
      suma += infoDinero.value[12] * 100;
      suma += infoDinero.value[13] * 200;
      suma += infoDinero.value[14] * 500;
      return suma;
    });

    function getDetalle() {
      const info = [
        {
          _id: "0.01",
          valor: infoDinero.value[0] * 0.01,
          unidades: infoDinero.value[0],
        },
        {
          _id: "0.02",
          valor: infoDinero.value[1] * 0.02,
          unidades: infoDinero.value[1],
        },
        {
          _id: "0.05",
          valor: infoDinero.value[2] * 0.05,
          unidades: infoDinero.value[2],
        },
        {
          _id: "0.10",
          valor: infoDinero.value[3] * 0.1,
          unidades: infoDinero.value[3],
        },
        {
          _id: "0.20",
          valor: infoDinero.value[4] * 0.2,
          unidades: infoDinero.value[4],
        },
        {
          _id: "0.50",
          valor: infoDinero.value[5] * 0.5,
          unidades: infoDinero.value[5],
        },
        {
          _id: "1",
          valor: infoDinero.value[6] * 1,
          unidades: infoDinero.value[6],
        },
        {
          _id: "2",
          valor: infoDinero.value[7] * 2,
          unidades: infoDinero.value[7],
        },
        {
          _id: "5",
          valor: infoDinero.value[8] * 5,
          unidades: infoDinero.value[8],
        },
        {
          _id: "10",
          valor: infoDinero.value[9] * 10,
          unidades: infoDinero.value[9],
        },
        {
          _id: "20",
          valor: infoDinero.value[10] * 20,
          unidades: infoDinero.value[10],
        },
        {
          _id: "50",
          valor: infoDinero.value[11] * 50,
          unidades: infoDinero.value[11],
        },
        {
          _id: "100",
          valor: infoDinero.value[12] * 100,
          unidades: infoDinero.value[12],
        },
        {
          _id: "200",
          valor: infoDinero.value[13] * 200,
          unidades: infoDinero.value[13],
        },
        {
          _id: "500",
          valor: infoDinero.value[14] * 500,
          unidades: infoDinero.value[14],
        },
      ];
      return info;
    }

    async function cerrarCaja() {
      try {
        const resCierre = await axios.post("caja/cerrarCaja", {
          total: total.value,
          detalleMonedas: getDetalle(),
          infoDinero: infoDinero.value,
          cantidad3G: Number(numpadRef2.value.cantidad),
          idDependienta: trabajadorActivo.value._id,
        });
        if (resCierre.data) {
          Swal.fire({
            title: "Caja cerrada correctamente",
            icon: "success",
            confirmButtonText: "Continuar",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/abrirCaja");
            }
          });
        } else {
          throw Error("No se ha podido cerrar la caja");
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    function confirmarCierre() {
      modalConfirmar.value = true;
    }

    const cantidad = computed(() => {
      if (numpadRef.value) {
        return Number(numpadRef.value.cantidad);
      }
      return null;
    });

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    watch(cantidad, () => {
      if (indexActivo.value != null && indexActivo.value != undefined) {
        infoDinero.value[indexActivo.value] = cantidad.value;
        setCookie("datosCierre", JSON.stringify(infoDinero.value), 7);
      }
    });

    onMounted(() => {
      try {
        const cookieStr = getCookie("datosCierre");
        if (cookieStr != "") {
          infoDinero.value = JSON.parse(cookieStr);
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Oops...", "No hay datos del último cierre", "info");
      }
    });

    provide("okValue", confirmarCierre);

    return {
      infoDinero,
      setActivo,
      indexActivo,
      sizeBilletes,
      total,
      numpadRef,
      cerrarCaja,
      modo,
      trabajadorActivo,
      modalConfirmar,
      confirmarCierre,
      cantidad3G,
      numpadRef2,
    };
  },
};
</script>

<style lang="scss" scoped>
$alturaInfoCaja: 21.9rem;
$alturaCajaDentro: 12rem;
.seleccionado {
  color: red;
  font-weight: bold;
}
.sizeInfoCaja {
  max-height: $alturaInfoCaja;
  min-height: $alturaInfoCaja;
}
.estiloInfoCaja {
  font-size: 1.5rem;
}
.estiloTituloInfo {
  font-size: 2rem;
}
.sizeCajaInfo {
  max-height: $alturaCajaDentro;
  min-height: $alturaCajaDentro;
}
</style>
