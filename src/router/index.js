import { createRouter, createWebHistory } from "vue-router";
import LoaderComponent from "../components/Loader.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: LoaderComponent,
  },
  {
    path: "/abrirCaja",
    name: "Abrir caja",
    component: () => import("../views/AbrirCajaView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
