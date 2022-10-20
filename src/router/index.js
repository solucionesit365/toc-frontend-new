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
    path: "/cestas",
    name: "Cestas",
    component: () => import("../views/CestasView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
