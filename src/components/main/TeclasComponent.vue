<template>
  <template v-for="(columna, index) in 6" v-bind:key="index">
    <div v-if="arrayTeclas && arrayTeclas.length > 0" class="row mt-1">
      <div
        class="col colJuntitas"
        v-for="(linea, indexX) in 6"
        v-bind:key="indexX"
      >
        <button
          v-if="arrayTeclas[indexX + 6 * index].idArticle"
          class="btn btn-primary w-100 teclas d-inline-block esconderTexto"
          :style="{
            'background-color':
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16),
            color: getTextColor(
              '#' + arrayTeclas[indexX + 6 * index].color.toString(16)
            ),
          }"
        >
          {{ arrayTeclas[indexX + 6 * index].nombreArticulo }}
        </button>
        <button v-else class="btn btn-primary w-100 teclas invisible">
          VACÍO
        </button>
      </div>
    </div>
  </template>
</template>

<script>
import store from "@/store";
import { computed } from "@vue/reactivity";

export default {
  name: "TeclasComponent",
  setup() {
    const teclado = computed(() => store.state.Teclado.objTeclado);
    const indexMenuActivo = computed(() => store.state.Teclado.indexMenuActivo);
    const indexSubmenuActivo = computed(
      () => store.state.Teclado.indexSubmenuActivo
    );

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

    return {
      teclado,
      arrayTeclas,
      getTextColor,
    };
  },
};
</script>

<style lang="scss" scoped>
.teclas {
  height: 70px;
  font-size: 0.9rem;
  min-width: 13.6rem;
  max-width: 13.6rem;
  max-height: 4rem;
  min-height: 4rem;
}
.colJuntitas {
  /* padding-right: 0px; */
  padding: 2px;
}

.esconderTexto {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
