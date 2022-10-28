import { createRouter, createWebHistory } from "vue-router";
import LoaderComponent from "../components/Loader.vue";
const routes = [
  {
    path: "/",
    name: "Loader",
    component: LoaderComponent,
  },
  {
    path: "/abrirCaja",
    name: "Abrir caja",
    component: () => import("../views/AbrirCajaView.vue"),
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../views/MainView.vue"),
  },
  {
    path: "/cobro",
    name: "Cobro",
    component: () => import("../views/CobroView.vue"),
  },
  {
    path: "/cestas",
    name: "Cestas",
    component: () => import("../views/CestasView.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () => import("../views/MenuPrincipalView.vue"),
    children: [
      {
        path: "caja",
        component: () => import("../views/CajaView.vue"),
        children: [
          {
            path: "cerrarCaja",
            component: () =>
              import("../components/menu/caja/CerrarCajaComponent.vue"),
          },
          {
            path: "tickets",
            component: () =>
              import("../components/menu/caja/TicketsComponent.vue"),
          },
          {
            path: "entradaDinero",
            component: () =>
              import("../components/menu/caja/EntradaComponent.vue"),
          },
          {
            path: "salidaDinero",
            component: () =>
              import("../components/menu/caja/SalidaComponent.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
