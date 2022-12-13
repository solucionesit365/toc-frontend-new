<template>
  <template v-for="(columna, index) in 6" v-bind:key="index">
    <div
      v-if="arrayTeclas && arrayTeclas.length > 0"
      class="row"
      :class="{ 'mt-1': index == 0 }"
    >
      <div
        class="col"
        :class="[
          teclado[indexMenuActivo].arraySubmenus &&
          teclado[indexMenuActivo].arraySubmenus.length > 0
            ? 'colJuntitasConSubmenus'
            : 'colJuntitas',
        ]"
        v-for="(linea, indexX) in 6"
        v-bind:key="indexX"
      >
        <MDBBtn
          v-if="arrayTeclas[indexX + 6 * index].idArticle"
          @click="clickTecla(arrayTeclas[indexX + 6 * index])"
          class="btn btn-primary w-100 d-inline-block esconderTexto"
          :class="[
            teclado[indexMenuActivo].arraySubmenus &&
            teclado[indexMenuActivo].arraySubmenus.length > 0
              ? 'teclasConSubmenu'
              : 'teclas',
          ]"
          :style="{
            'background-color':
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16),
            color: getTextColor(
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16)
            ),
          }"
          >{{ arrayTeclas[indexX + 6 * index].nombreArticulo }}</MDBBtn
        >
        <!-- <button
          v-if="arrayTeclas[indexX + 6 * index].idArticle"
          @click="clickTecla(arrayTeclas[indexX + 6 * index])"
          class="btn btn-primary w-100 d-inline-block esconderTexto"
          :class="[
            teclado[indexMenuActivo].arraySubmenus &&
            teclado[indexMenuActivo].arraySubmenus.length > 0
              ? 'teclasConSubmenu'
              : 'teclas',
          ]"
          :style="{
            'background-color':
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16),
            color: getTextColor(
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16)
            ),
          }"
        >
          {{ arrayTeclas[indexX + 6 * index].nombreArticulo }}
        </button> -->
        <button
          v-else
          class="btn btn-primary w-100 invisible"
          :class="[
            teclado[indexMenuActivo].arraySubmenus == null
              ? 'teclas'
              : 'teclasConSubmenu',
          ]"
        >
          VACÍO
        </button>
      </div>
    </div>
  </template>
  <PesoComponent ref="modalPesoRef" />
</template>

<script>
import { computed, onMounted, provide, ref } from "vue";
import PesoComponent from "./PesoComponent.vue";
import axios from "axios";
import Swal from "sweetalert2";
import { MDBBtn } from "mdb-vue-ui-kit";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "TeclasComponent",
  components: {
    PesoComponent,
    MDBBtn,
  },
  setup(_props, { expose }) {
    const store = useStore();
    const router = useRouter();
    const teclado = computed(() => store.state.Teclado.objTeclado);
    const indexMenuActivo = computed(() => store.state.Teclado.indexMenuActivo);
    const arrayCestas = computed(() => store.state.Cestas.arrayCestas);
    const arrayTrabajadores = computed(
      () => store.state.Trabajadores.arrayTrabajadores
    );
    const indexTrabajadorActivo = computed(
      () => store.state.Trabajadores.indexActivo
    );
    const indexSubmenuActivo = computed(
      () => store.state.Teclado.indexSubmenuActivo
    );
    const modalPesoRef = ref(null);
    const unidadesAplicar = computed(() => store.state.Unidades.unidades);

    const cesta = computed(() => {
      if (arrayCestas.value) {
        for (let i = 0; i < arrayCestas.value.length; i++) {
          if (
            arrayCestas.value[i]._id ==
            arrayTrabajadores.value[indexTrabajadorActivo.value].idCesta
          ) {
            return arrayCestas.value[i];
          }
        }
      }
      return null;
    });

    function generarTecladoVacio() {
      let auxArray = [];
      for (let i = 0; i < 36; i++) {
        auxArray[i] = {
          idArticle: null,
          nombreArticulo: null,
          pos: i,
          color: null,
          esSumable: null,
        };
      }
      return auxArray;
    }

    async function clickTecla(item) {
      try {
        if (!cesta.value)
          throw Error("Es necesario una cesta activa para añadir un artículo");

        if (item.esSumable) {
          if (store.getters["Configuracion/suplementosActivos"]) {
            console.log("COMPROBAR SI TIENE SUPLEMENTOS");
          } else {
            const resClick = await axios.post("teclado/clickTeclaArticulo", {
              idArticulo: item.idArticle,
              gramos: 0,
              idCesta: cesta.value._id,
              unidades: unidadesAplicar.value,
              arraySuplementos: null,
            });
            if (resClick.data) store.dispatch("Unidades/setUnidades", 1);
            else throw Error("No se ha podido añadir el artículo a la cesta");
          }
        } else {
          modalPesoRef.value.abrirModal(item.idArticle, cesta.value._id);
        }
      } catch (err) {
        Swal.fire("Oops...", err.message, "error");
      }
    }

    const arrayTeclas = computed(() => {
      let auxArray = generarTecladoVacio();
      /* Teclado con submenús */
      if (
        teclado.value &&
        teclado.value[indexMenuActivo.value] &&
        teclado.value[indexMenuActivo.value].arraySubmenus &&
        teclado.value[indexMenuActivo.value].arraySubmenus[
          indexSubmenuActivo.value
        ]
      ) {
        for (
          let i = 0;
          i <
          teclado.value[indexMenuActivo.value].arraySubmenus[
            indexSubmenuActivo.value
          ].arrayTeclas.length;
          i++
        ) {
          auxArray[
            teclado.value[indexMenuActivo.value].arraySubmenus[
              indexSubmenuActivo.value
            ].arrayTeclas[i].pos
          ] =
            teclado.value[indexMenuActivo.value].arraySubmenus[
              indexSubmenuActivo.value
            ].arrayTeclas[i];
        }
      } else {
        /* Teclado sin submenús */
        if (
          teclado.value &&
          teclado.value[indexMenuActivo.value] &&
          teclado.value[indexMenuActivo.value].arrayTeclas
        ) {
          for (
            let i = 0;
            i < teclado.value[indexMenuActivo.value].arrayTeclas.length;
            i++
          ) {
            auxArray[teclado.value[indexMenuActivo.value].arrayTeclas[i].pos] =
              teclado.value[indexMenuActivo.value].arrayTeclas[i];
          }
        }
      }

      return auxArray;
    });

    function getRGB(c) {
      return parseInt(c, 16) || c;
    }

    function getsRGB(c) {
      return getRGB(c) / 255 <= 0.03928
        ? getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
    }

    function getLuminance(hexColor) {
      return (
        0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(-2))
      );
    }

    function getContrast(f, b) {
      const L1 = getLuminance(f);
      const L2 = getLuminance(b);
      return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    }

    function getTextColor(bgColor) {
      const whiteContrast = getContrast(bgColor, "#ffffff");
      const blackContrast = getContrast(bgColor, "#000000");

      return whiteContrast > blackContrast ? "#ffffff" : "#000000";
    }

    function addItem(item) {
      console.log(item);
    }

    provide("addItem", addItem);
    expose({
      clickTecla,
    });

    onMounted(() => {
      if (!arrayTrabajadores.value || arrayTrabajadores.value?.length === 0) {
        router.push("menu/fichajes");
      }
    });

    return {
      teclado,
      indexMenuActivo,
      arrayTeclas,
      getTextColor,
      modalPesoRef,
      clickTecla,
    };
  },
};
</script>

<style lang="scss" scoped>
.teclasConSubmenu {
  height: 70px;
  font-size: 0.9rem;
  min-width: 13.99rem;
  max-width: 13.99rem;
  max-height: 4.04rem;
  min-height: 4.04rem;
}
.teclas {
  height: 70px;
  font-size: 0.9rem;
  min-width: 13.9rem;
  max-width: 13.9rem;
  max-height: 4.3rem;
  min-height: 4.3rem;
}
.colJuntitas {
  padding: 3px 0px 3px 0px;
}
.colJuntitasConSubmenus {
  padding: 1px 0px 1px 0px;
}

.esconderTexto {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
