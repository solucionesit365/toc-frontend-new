<template>
  <MDBModal
    id="modalSuplementos"
    tabindex="-1"
    labelledby="staticBackdropLabel"
    v-model="modalSuplementos"
    staticBackdrop
  >
    <MDBModalHeader>
      <MDBModalTitle id="staticBackdropLabel">
        Selecciona los suplementos {{ totalSuplementos.toFixed(2) }} €
      </MDBModalTitle>
    </MDBModalHeader>
    <MDBModalBody class="mx-auto modal-body">
      <div class="row">
        <div
          v-for="(suplemento, index) of arrayCompletoSuplementos"
          :key="index"
          class="col mb-3"
        >
          <button
            class="btn w-100 h-100 colorIvan1 btnSuplemento"
            @click="addSuplemento(suplemento)"
            v-bind:class="[
              { suplementoActivo: checkSuplementoActivo(suplemento._id) },
            ]"
          >
            {{ suplemento.nombre }}
            <br />
            {{ suplemento.precioConIva }} €
          </button>
        </div>
      </div>
      <div class="row">
        <div
          class="table-responsive divCesta reverso"
          v-if="suplementosSeleccionados"
        >
          <table class="table colorFuente">
            <tbody class="tableBody">
              <tr
                v-for="(item, index) of suplementosSeleccionados"
                :key="index"
                class="itemCesta"
                @click="setIndex(index)"
                v-bind:class="{
                  seleccionado: itemSeleccionado === index,
                }"
              >
                <td>
                  <span
                    class="d-inline-block text-truncate"
                    style="max-width: 21rem; min-width: 21rem"
                    >{{ item.nombre }}</span
                  >
                </td>
                <td>{{ item.precioConIva.toFixed(2) }} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MDBModalBody>
    <MDBModalFooter>
      <MDBBtn color="danger" @click="eliminarActivo()" size="lg">
        Eliminar
      </MDBBtn>
      <MDBBtn color="secondary" @click="modalSuplementos = false" size="lg">
        Cerrar
      </MDBBtn>
      <MDBBtn color="success" size="lg" @click="insertarArticulo()">
        Aceptar
      </MDBBtn>
    </MDBModalFooter>
  </MDBModal>
</template>

<script>
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
} from "mdb-vue-ui-kit";
import { ref, provide, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "SuplementosComponent",
  components: {
    MDBModal,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const modalSuplementos = ref(false);
    const numpadRef = ref(null);
    const itemSeleccionado = ref(null);
    const infoArticulo = {
      idArticulo: null,
      idCesta: null,
      cliente: null,
      suplementos: null,
    };
    const suplementosSeleccionados = ref([]);
    const arrayCompletoSuplementos = ref([]);
    let unidadesAplicar = 0;
    const totalSuplementos = computed(() => {
      if (
        suplementosSeleccionados.value &&
        suplementosSeleccionados.value.length > 0
      ) {
        let suma = 0;
        for (let i = 0; i < suplementosSeleccionados.value.length; i++) {
          suma += suplementosSeleccionados.value[i].precioConIva;
        }
        return suma;
      }
      return 0;
    });

    async function abrirModal(
      idArticulo,
      idCesta,
      cliente,
      arrayIdSuplementos,
      unidades
    ) {
      infoArticulo.idArticulo = idArticulo;
      infoArticulo.idCesta = idCesta;
      infoArticulo.cliente = cliente;
      unidadesAplicar = unidades;

      const res = await axios.post("articulos/getSuplementos", {
        arrayIdSuplementos,
      });

      if (res) {
        arrayCompletoSuplementos.value = res.data;
      } else {
        throw Error("No se ha podido obtener la lista de suplementos");
      }
      modalSuplementos.value = true;
    }

    expose({
      abrirModal,
    });

    function addSuplemento(suplemento) {
      try {
        suplementosSeleccionados.value.push(suplemento);
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    function checkSuplementoActivo(idSuplemento) {
      const s = suplementosSeleccionados.value.findIndex(
        (o) => o.suplemento === idSuplemento
      );
      return s !== -1 ? true : false;
    }

    function setIndex(index) {
      itemSeleccionado.value = index;
    }

    function eliminarActivo() {
      suplementosSeleccionados.value.splice(itemSeleccionado.value, 1);
    }

    async function insertarArticulo() {
      try {
        const res = await axios.post("teclado/clickTeclaArticulo", {
          idArticulo: infoArticulo.idArticulo,
          gramos: 0,
          idCesta: infoArticulo.idCesta,
          unidades: unidadesAplicar,
          arraySuplementos: suplementosSeleccionados.value,
        });

        infoArticulo.idArticulo = null;
        infoArticulo.idCesta = null;
        suplementosSeleccionados.value = [];
        if (res.data) {
          modalSuplementos.value = false;
        } else {
          throw Error("No se ha podido insertar el artículo con suplementos");
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    function test() {
      console.log(45);
    }

    provide("okValue", insertarArticulo);
    return {
      modalSuplementos,
      addSuplemento,
      checkSuplementoActivo,
      numpadRef,
      arrayCompletoSuplementos,
      suplementosSeleccionados,
      itemSeleccionado,
      insertarArticulo,
      setIndex,
      eliminarActivo,
      totalSuplementos,
      test,
    };
  },
};
</script>

<style lang="scss" scoped>
.divCesta {
  background-color: white;
  height: 15.6rem !important;
}
.reverso {
  display: flex;
  flex-direction: column-reverse;
}
.seleccionado {
  background-color: rgb(255, 221, 176) !important;
}
</style>
