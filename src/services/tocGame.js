import axios from "axios";
import router from "../router/index";
import { useToast } from "vue-toastification";
import { emitSocket } from "./sockets";

const toast = useToast();
const baseURL = "http://localhost:3000/";

class tocGameV3 {
  /* Eze 4.0 */
  async todoInstalado() {
    try {
      return (await axios.get(baseURL + "parametros/todoInstalado")).data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      return false;
    }
  }

  /* Eze 4.0 */
  async hayFichados() {
    try {
      return (await axios.get(baseURL + "trabajadores/hayFichados")).data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return false;
    }
  }

  /* Eze 4.0 */
  async cajaAbierta() {
    try {
      return (await axios.get(baseURL + "caja/estadoCaja")).data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
      return false;
    }
  }

  /* Eze 4.0 */
  async getParametros() {
    try {
      return (await axios.post(baseURL + "parametros/getParametros")).data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
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
}

export const tocGame = new tocGameV3();
