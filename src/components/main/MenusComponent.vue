<template>
  <div class="row pb-1" id="menusColores" v-if="showBackButton">
    <div
      v-for="(item, index) of listaSubmenus"
      :key="index"
      @click="clickSubmenu(item.tag)"
      class="col colJuntitas menus"
      styled="padding-left: 4px;"
    >
      <button
        class="btn btn-secondary w-100 menus menusColorIvan colorMenus"
        v-bind:class="[{ activo: submenuEsActivo(item.tag) }]"
      >
        {{ item.nombre }}
      </button>
    </div>
  </div>
  <div
    class="row"
    id="menusColores"
    v-bind:class="[
      { 'mb-3': showBackButton === true, 'p-2': showBackButton === false },
    ]"
  >
    <div v-if="listaMenus.length <= 11">
      <div v-if="showBackButton">
        <div
          v-for="(item, index) of listaMenus"
          :key="item.nomMenu"
          @click="clickMenu(index)"
          class="col colJuntitasMenus subMenus"
          style="padding-left: 4px"
        >
          <button
            class="btn btn-secondary w-100 subMenus menusColorIvan colorMenus"
            v-bind:class="[{ activo: esActivo(index) }]"
          >
            {{ item.nomMenu.replace(item.tag, "") }}
          </button>
        </div>
      </div>
      <div v-else>
        <div
          v-for="(item, index) of listaMenus"
          :key="item.nomMenu"
          @click="clickMenu(index)"
          class="col colJuntitasMenus menusSimples"
          style="padding-left: 4px"
        >
          <button
            class="btn btn-secondary w-100 menusSimples menusColorIvan colorMenus"
            v-bind:class="[{ activo: esActivo(index) }]"
          >
            {{ item.nomMenu }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="scrollmenu">
      <div class="scrollmenu" style="-webkit-transform: translateZ(0)">
        <div class="col colJuntitasMenus menus">
          <button
            v-for="(item, index) of listaMenus"
            :key="index"
            style="width: 200px"
            class="btn btn-secondary menus menusColorIvan ms-2"
            v-bind:class="[{ activo: esActivo(index) }, 'colorMenus']"
            @click="clickMenu(index)"
          >
            {{ item.nomMenu }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "MenusComponent",
  setup() {
    const showBackButton = ref(false);
    const listaMenus = ref([{ nomMenu: "" }]);
    const listaSubmenus = ref([{ nombre: "", tag: "" }]);
    const dobleMenu = ref(false);
    const listadoTeclas = ref([]);
    const listaPrecios = ref([
      {
        _id: -1,
        nombre: "",
        precioConIva: 0,
        precioBase: 0,
        tipoIva: 0,
        esSumable: true,
        familia: "",
      },
    ]);
    let clickBack = false;
    let menuActivo = 0;
    let subMenuActivo = "01";

    function esActivo(x) {
      return x === menuActivo;
    }

    function submenuEsActivo(x) {
      return x === subMenuActivo;
    }

    function cargarTeclado(data) {
      resetTeclado();
      for (let i = 0; i < data.length; i += 1) {
        listadoTeclas.value[data[i].pos].nombreArticulo.nombre =
          data[i].nombreArticulo;
        if (data[i].nombreArticulo != null) {
          listadoTeclas.value[data[i].pos].idArticle = data[i].idArticle;
        } else {
          listadoTeclas.value[data[i].pos].idArticle = -1;
        }
        // this.listadoTeclas[data[i].pos].color = this.auxTranslateColor(i);
        listadoTeclas.value[data[i].pos].esSumable = data[i].esSumable;
        /* LISTADO PRECIOS */
        const datosProducto = listaPrecios.value.find(
          (x) => x.nombre === data[i].nombreArticulo
        );
        listadoTeclas.value[data[i].pos].nombreArticulo.precio =
          datosProducto !== undefined ? `${datosProducto.precioConIva}€` : "0€";
      }
    }

    function clickMenu(index) {
      /* Debe existir al menos 1 menú en el array */
      console.log(listaMenus.value);
      if (listaMenus.value.length > 0) {
        axios
          .post("/menus/clickMenu", {
            nombreMenu: listaMenus.value[index].nomMenu,
          })
          .then((res) => {
            if (!res.data.bloqueado) {
              menuActivo = index;
              cargarTeclado(res.data.resultado);
            } else {
              console.log("Pero donde vas, Rayo McQueen");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    function clickSubmenu(tag) {
      axios.post("/doble-menus/clickMenu", { tag }).then((res) => {
        if (!res.data.bloqueado) {
          listaMenus.value = res.data.resultado;

          subMenuActivo = tag;
          clickMenu(0);
          dobleMenu.value = false;
        } else {
          console.log("Kachau");
        }
      });
    }

    function getSubmenus(backButton = false) {
      axios.post("/doble-menus/getMenus").then((res) => {
        console.log(res.data);
        if (res.data.resultado.length > 0) {
          listaSubmenus.value = res.data.resultado;
          console.log("eze: ", res.data);
          if (!backButton) clickSubmenu(res.data.resultado[0].tag);
          else dobleMenu.value = true;
          showBackButton.value = true;
          if (!clickBack) {
            axios
              .post("/menus/getSubmenus", { tag: res.data.resultado[0].tag })
              .then((res2) => {
                if (!res2.data.bloqueado) {
                  listaMenus.value = res2.data.resultado;
                  clickMenu(0);
                } else {
                  console.log("F TECLADO");
                }
              });
          }
        } else {
          dobleMenu.value = false;
        }
      });
    }
    getSubmenus();

    axios.post("/menus/getMenus").then((res) => {
      if (res.data) {
        listaMenus.value = res.data;
        clickMenu(0);
      } else {
        console.log("No  hay menús");
      }
    });

    function resetTeclado() {
      listadoTeclas.value = [
        {
          idBoton: "tecla0",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla1",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla2",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla3",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla4",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla5",
          idArticle: -1,
          pos: -1,
          color: "colorIvan1",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla6",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla7",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla8",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla9",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla10",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla11",
          idArticle: -1,
          pos: -1,
          color: "colorIvan2",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla12",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla13",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla14",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla15",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla16",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla17",
          idArticle: -1,
          pos: -1,
          color: "colorIvan3",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla18",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla19",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla20",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla21",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla22",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla23",
          idArticle: -1,
          pos: -1,
          color: "colorIvan4",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla24",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla25",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla26",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla27",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla28",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla29",
          idArticle: -1,
          pos: -1,
          color: "colorIvan5",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla30",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla31",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla32",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla33",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla34",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
        {
          idBoton: "tecla35",
          idArticle: -1,
          pos: -1,
          color: "colorIvan6",
          nombreArticulo: { nombre: "", precio: "" },
          esSumable: true,
        },
      ];
    }

    return {
      showBackButton,
      listaMenus,
      listaSubmenus,
      dobleMenu,
      esActivo,
      submenuEsActivo,
      menuActivo,
      subMenuActivo,
    };
  },
};
</script>

<style lang="scss" scoped>
.teclas {
  height: 70px;
}
.colJuntitas {
  /* padding-right: 0px; */
  padding: 2px;
}
.colorIvan1 {
  background-color: #dee3e9 !important;
  color: #5e5f61 !important;
  border-color: #dee3e9 !important;
}
.colorIvan2 {
  background-color: #eddecb !important;
  color: #5e5f61 !important;
  border-color: #eddecb !important;
}
.colorIvan3 {
  background-color: #fbb5b5 !important;
  color: #5e5f61 !important;
  border-color: #fbb5b5 !important;
}
.colorIvan4 {
  background-color: #dce9d5 !important;
  color: #5e5f61 !important;
  border-color: #dce9d5 !important;
}
.colorIvan5 {
  background-color: #efd8a6 !important;
  color: #5e5f61 !important;
  border-color: #efd8a6 !important;
}
.colorIvan6 {
  background-color: #b0aec6 !important;
  color: #5e5f61 !important;
  border-color: #b0aec6 !important;
}
.botonesMenu {
  background-color: #d45600;
  border-color: #d45600;
  margin-right: 4px;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
.menus {
  height: 35px;
}
.subMenus {
  height: 50px;
}
.menusSimples {
  height: 70px;
}
.colorMenus {
  background-color: #fff5e9 !important;
  color: #c95907 !important;
  border-color: #bf5c18 !important;
}
.activo {
  background-color: #d45600 !important;
  color: #fffaee !important;
  border-color: #d45600 !important;
}
.btn-secondary:hover {
  color: #c95907 !important;
  background-color: #fff5e9 !important;
  border-color: #bf5c18 !important;
}
.btn-secondary:focus,
.btn-secondary.focus {
  /* color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important; */
  background-color: #d45600 !important;
  color: #fffaee !important;
  border-color: #d45600 !important;
  box-shadow: none !important;
}
.btn-secondary.disabled,
.btn-secondary:disabled {
  color: #fff !important;
  background-color: #6c757d !important;
  border-color: #6c757d !important;
}
.btn-secondary:not(:disabled):not(.disabled):active,
.btn-secondary:not(:disabled):not(.disabled).active,
.show > .btn-secondary.dropdown-toggle {
  /* color: #c95907 !important;
    background-color: #fff5e9 !important;
    border-color: #bf5c18 !important; */
  background-color: #d45600 !important;
  color: #fffaee !important;
  border-color: #d45600 !important;
}
.btn-secondary:not(:disabled):not(.disabled):active:focus,
.btn-secondary:not(:disabled):not(.disabled).active:focus
  .show
  > .btn-secondary.dropdown-toggle:focus {
  box-shadow: none !important;
}
.colJuntitasMenus {
  padding-right: 0px;
}
div.scrollmenu {
  width: 100%;
  overflow-x: scroll;
  white-space: nowrap;
}
.suplementoActivo {
  background-color: #fbb5b5 !important;
}
.btnSuplemento:focus,
.btnSuplemento:active {
  box-shadow: none !important;
}
.editarArticulos {
  background-color: #c95807a4 !important;
  border-color: transparent !important;
}
</style>
