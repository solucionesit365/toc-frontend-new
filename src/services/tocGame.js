import axios from "axios";
import Swal from "sweetalert2";
import router from "../router/index";
import { emitSocket } from "./sockets";

const baseURL = "http://localhost:3000/";

class tocGameV3 {
  /* Eze 4.0 */
  async todoInstalado() {
    try {
      return (await axios.get(baseURL + "parametros/todoInstalado")).data;
    } catch (err) {
      Swal.fire("Oops...", err.message, "error");
      return false;
    }
  }

  /* Eze 4.0 */
  async hayFichados() {
    try {
      return (await axios.get(baseURL + "trabajadores/hayFichados")).data;
    } catch (err) {
      Swal.fire("Oops...", err.message, "error");
      return false;
    }
  }

  /* Eze 4.0 */
  async cajaAbierta() {
    try {
      return (await axios.get(baseURL + "caja/estadoCaja")).data;
    } catch (err) {
      Swal.fire("Oops...", err.message, "error");
      return false;
    }
  }

  /* Eze 4.0 */
  async getParametros() {
    try {
      return (await axios.post(baseURL + "parametros/getParametros")).data;
    } catch (err) {
      Swal.fire("Oops...", err.message, "error");
      return null;
    }
  }

  /* Eze 4.0 */
  async iniciarToc() {
    if (await this.todoInstalado()) {
      if (await this.hayFichados()) {
        if (await this.cajaAbierta()) {
          router.push("/main");
        } else {
          router.push("/abrirCaja");
        }
      } else {
        router.push("/menu/fichajes");
      }
    } else {
      router.push("/installWizard");
    }
  }

  /* Eze 4.0 */
  cargarTrabajadoresFichados = () => emitSocket("cargarTrabajadores");

  /* Eze 4.0 */
  cargarCestas = () => emitSocket("cargarCestas");

  /* Eze 4.0 */
  cargarVentas = () => emitSocket("cargarVentas");

  /* Eze 4.0 */
  cargarTeclado = () => emitSocket("cargarTeclado");
}

export const tocGame = new tocGameV3();

// setInterval(async () => {
//   if (
//     router.currentRoute.value.path != "/abrirCaja" &&
//     router.currentRoute.value.path != "/installWizard"
//   ) {
//     if (!(await tocGame.cajaAbierta())) {
//       router.push("/abrirCaja");
//     }
//   }
// }, 3000);
