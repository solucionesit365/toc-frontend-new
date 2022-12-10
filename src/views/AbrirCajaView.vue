<template>
  <div class="container-fluid">
    <div class="row">
      <h2>ABRIR CAJA</h2>
    </div>

    <div class="row p-2" style="text-align: center">
      <div class="col" @click="setActivo(0)">
        <img src="/img/1cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 0, unidadesSize: true }">
          {{ infoDinero[0].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(1)">
        <img src="/img/2cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 1, unidadesSize: true }">
          {{ infoDinero[1].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(2)">
        <img src="/img/5cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 2, unidadesSize: true }">
          {{ infoDinero[2].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(3)">
        <img src="/img/10cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 3, unidadesSize: true }">
          {{ infoDinero[3].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(4)">
        <img src="/img/20cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 4, unidadesSize: true }">
          {{ infoDinero[4].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(5)">
        <img src="/img/50cts.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 5, unidadesSize: true }">
          {{ infoDinero[5].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(6)">
        <img src="/img/uneuro.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 6, unidadesSize: true }">
          {{ infoDinero[6].valor }} unidades
        </label>
      </div>
      <div class="col" @click="setActivo(7)">
        <img src="/img/doseuros.png" width="84" height="84" />
        <label :class="{ infoDineros: activo == 7, unidadesSize: true }">
          {{ infoDinero[7].valor }} unidades
        </label>
      </div>
    </div>

    <div class="row mx-auto mt-4">
      <div class="col" style="text-align: center" @click="setActivo(8)">
        <img src="/img/5euros.png" :width="sizeBilletes" /> <br />
        <label :class="{ infoDineros: activo == 8, unidadesSize: true }">
          {{ infoDinero[8].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(9)">
        <img src="/img/10euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 9, unidadesSize: true }">
          {{ infoDinero[9].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(10)">
        <img src="/img/20euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 10, unidadesSize: true }">
          {{ infoDinero[10].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(11)">
        <img src="/img/50euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 11, unidadesSize: true }">
          {{ infoDinero[11].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(12)">
        <img src="/img/100euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 12, unidadesSize: true }">
          {{ infoDinero[12].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(13)">
        <img src="/img/200euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 13, unidadesSize: true }">
          {{ infoDinero[13].valor }} unidades
        </label>
      </div>
      <div class="col" style="text-align: center" @click="setActivo(14)">
        <img src="/img/500euros.png" :width="sizeBilletes" />
        <br />
        <label :class="{ infoDineros: activo == 14, unidadesSize: true }">
          {{ infoDinero[14].valor }} unidades
        </label>
      </div>
    </div>

    <div class="row mx-auto mt-5">
      <div class="text-center">
        <a class="boton" @click="addNumero(0)">0</a>
        <a class="boton" @click="addNumero(1)">1</a>
        <a class="boton" @click="addNumero(2)">2</a>
        <a class="boton" @click="addNumero(3)">3</a>
        <a class="boton" @click="addNumero(4)">4</a>
        <a class="boton" @click="addNumero(5)">5</a>
        <a class="boton" @click="addNumero(6)">6</a>
        <a class="boton" @click="addNumero(7)">7</a>
        <a class="boton" @click="addNumero(8)">8</a>
        <a class="boton" @click="addNumero(9)">9</a>
        <a class="boton" @click="borrarNumero()">&lt;</a>
      </div>
    </div>

    <div class="position-absolute bottom-0 start-0 mb-4 ms-2">
      <MDBBtn
        color="primary"
        style="font-size: 27px"
        size="lg"
        @click="abrirModalConfirmacion()"
        >ABRIR CON {{ getTotal.toFixed(2) }} €
      </MDBBtn>
      <MDBBtn
        color="warning"
        style="font-size: 27px"
        size="lg"
        @click="volver()"
        >VOLVER
      </MDBBtn>
    </div>
  </div>

  <MDBModal
    id="modalConfirmacionApertura"
    tabindex="-1"
    labelledby="tituloModalConfirmacionApertura"
    v-model="modalConfirmacionApertura"
    centered
    staticBackdrop
  >
    <MDBModalBody>
      <div class="row">
        <div class="col">
          <MDBBtn
            color="danger"
            class="w-100"
            size="lg"
            @click="modalConfirmacionApertura = false"
            >Cancelar</MDBBtn
          >
        </div>
        <div class="col">
          <MDBBtn color="success" size="lg" class="w-100" @click="abrirCaja()"
            >Confirmar</MDBBtn
          >
        </div>
      </div>
    </MDBModalBody>
  </MDBModal>
  <!-- <ModalClientesComponent ref="ejemplo" /> -->
  <!-- <span v-if="ejemplo"> agujero al child: {{ ejemplo.datoBorrar }}</span> -->
</template>
<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import router from "../router/index";
import Swal from "sweetalert2";
import { MDBModal, MDBModalBody, MDBBtn } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
// import ModalClientesComponent from "../components/main/ModalClientes.vue";

export default {
  name: "AbrirCajaView",
  components: {
    MDBModal,
    MDBModalBody,
    MDBBtn,
    // ModalClientesComponent,
  },
  setup() {
    const store = useStore();
    const modalConfirmacionApertura = ref(false);
    const ejemplo = ref(null);
    const lolaso = computed(() => 69);
    const infoDinero = ref([
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
      { valor: 0, style: "" },
    ]);
    const activo = ref(0);
    const totalClearOne = 0;
    const sizeBilletes = "160";
    const cantidad3G = ref(0);

    const getTotal = computed(() => {
      let total = 0;
      total += infoDinero.value[0].valor * 0.01;
      total += infoDinero.value[1].valor * 0.02;
      total += infoDinero.value[2].valor * 0.05;
      total += infoDinero.value[3].valor * 0.1;
      total += infoDinero.value[4].valor * 0.2;
      total += infoDinero.value[5].valor * 0.5;
      total += infoDinero.value[6].valor * 1;
      total += infoDinero.value[7].valor * 2;
      total += infoDinero.value[8].valor * 5;
      total += infoDinero.value[9].valor * 10;
      total += infoDinero.value[10].valor * 20;
      total += infoDinero.value[11].valor * 50;
      total += infoDinero.value[12].valor * 100;
      total += infoDinero.value[13].valor * 200;
      total += infoDinero.value[14].valor * 500;
      return total;
    });

    const getDetalle = computed(() => {
      const info = [
        {
          _id: "0.01",
          valor: infoDinero.value[0].valor * 0.01,
          unidades: infoDinero.value[0].valor,
        },
        {
          _id: "0.02",
          valor: infoDinero.value[1].valor * 0.02,
          unidades: infoDinero.value[1].valor,
        },
        {
          _id: "0.05",
          valor: infoDinero.value[2].valor * 0.05,
          unidades: infoDinero.value[2].valor,
        },
        {
          _id: "0.10",
          valor: infoDinero.value[3].valor * 0.1,
          unidades: infoDinero.value[3].valor,
        },
        {
          _id: "0.20",
          valor: infoDinero.value[4].valor * 0.2,
          unidades: infoDinero.value[4].valor,
        },
        {
          _id: "0.50",
          valor: infoDinero.value[5].valor * 0.5,
          unidades: infoDinero.value[5].valor,
        },
        {
          _id: "1",
          valor: infoDinero.value[6].valor * 1,
          unidades: infoDinero.value[6].valor,
        },
        {
          _id: "2",
          valor: infoDinero.value[7].valor * 2,
          unidades: infoDinero.value[7].valor,
        },
        {
          _id: "5",
          valor: infoDinero.value[8].valor * 5,
          unidades: infoDinero.value[8].valor,
        },
        {
          _id: "10",
          valor: infoDinero.value[9].valor * 10,
          unidades: infoDinero.value[9].valor,
        },
        {
          _id: "20",
          valor: infoDinero.value[10].valor * 20,
          unidades: infoDinero.value[10].valor,
        },
        {
          _id: "50",
          valor: infoDinero.value[11].valor * 50,
          unidades: infoDinero.value[11].valor,
        },
        {
          _id: "100",
          valor: infoDinero.value[12].valor * 100,
          unidades: infoDinero.value[12].valor,
        },
        {
          _id: "200",
          valor: infoDinero.value[13].valor * 200,
          unidades: infoDinero.value[13].valor,
        },
        {
          _id: "500",
          valor: infoDinero.value[14].valor * 500,
          unidades: infoDinero.value[14].valor,
        },
      ];
      return info;
    });

    function setActivo(x) {
      activo.value = x;
    }

    function volver() {
      router.push("/menu/caja");
    }

    function addNumero(x) {
      infoDinero.value[activo.value].valor = Number(
        infoDinero.value[activo.value].valor.toString() + x
      );
    }

    function resetTodo() {
      infoDinero.value = [
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
        { valor: 0, style: "" },
      ];
      cantidad3G.value = 0;
    }

    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    async function abrirCaja() {
      try {
        const resApertura = (
          await axios.post("/caja/abrirCaja", {
            total: getTotal.value,
            detalle: getDetalle.value,
            idDependienta:
              store.getters["Trabajadores/getTrabajadorActivo"]._id,
          })
        ).data;
        if (resApertura) {
          cerrarModalConfirmacion();
          Swal.fire("¡Todo OK!", "Caja abierta correctamente", "success");
          setCookie("datosCierre", "", 7);
          router.push("/main");
        } else {
          throw Error("No se ha podido abrir la caja");
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error", err.messaeg, "error");
      }
    }

    function borrarNumero() {
      infoDinero.value[activo.value].valor = Number(
        infoDinero.value[activo.value].valor.toString().slice(0, -1)
      );
    }

    function abrirModalConfirmacion() {
      modalConfirmacionApertura.value = true;
    }

    function cerrarModalConfirmacion() {
      modalConfirmacionApertura.value = false;
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

    onMounted(() => {
      const infoGuardadaStr = getCookie("datosCierre");
      if (infoGuardadaStr != "") {
        const infoGuardada = JSON.parse(infoGuardadaStr);
        for (let i = 0; i < infoGuardada.length; i++) {
          infoDinero.value[i].valor = infoGuardada[i];
        }
      }
      // axios
      //   .get("caja/getMonedasUltimoCierre")
      //   .then((res) => {
      //     if (res.data && res.data.array) {
      //       infoDinero.value = res.data.array;
      //     } else {
      //       Swal.fire(
      //         "Oops...",
      //         "No se ha podido cargar la información (backend)",
      //         "warning"
      //       );
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     Swal.fire(
      //       "Error",
      //       "No se ha podido cargar la información del último cierre (petición)",
      //       "error"
      //     );
      //   });
    });

    // provide("doSomething", doSomething);

    return {
      lolaso,
      ejemplo,
      volver,
      infoDinero,
      activo,
      totalClearOne,
      sizeBilletes,
      setActivo,
      addNumero,
      resetTodo,
      borrarNumero,
      getTotal,
      cantidad3G,
      abrirCaja,
      abrirModalConfirmacion,
      cerrarModalConfirmacion,
      modalConfirmacionApertura,
    };
  },
};
</script>
<style scoped>
.infoDineros {
  color: red;
  font-weight: bold;
}
.colorTexto {
  color: #c95907;
}

.totalStyle {
  font-size: 60px;
  font-weight: bold;
}
.botonesCalculadora {
  background-color: #fff5e9;
  color: #c95907;
  border-width: 3px;
  border: 1px solid #bf5c18;
}
.unidadesSize {
  font-size: 25px;
}
.boton {
  box-shadow: inset 0px 1px 0px 0px #dcecfb;
  background-color: #bddbfa;
  border-radius: 6px;
  border: 1px solid #84bbf3;
  display: inline-block;
  cursor: pointer;
  color: #000000;
  font-family: Arial;
  font-size: 20px;
  font-weight: bold;
  padding: 20px 29px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #528ecc;
  margin: 0.5vw;
}
.boton:hover {
  background-color: #80b5ea;
}
.boton:active {
  position: relative;
  top: 1px;
}
</style>
