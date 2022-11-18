import { io } from "socket.io-client";
import { useToast } from "vue-toastification";
import store from "../store/index";
import router from "../router/index";
import Swal from "sweetalert2";

const socket = io("http://localhost:5051");
const toast = useToast();

/* Eze 4.0 */
socket.on("cargarTrabajadores", (arrayTrabajadores) => {
  try {
    if (arrayTrabajadores) {
      store.dispatch("Trabajadores/setArrayTrabajadores", arrayTrabajadores);
      if (
        store.getters["Trabajadores/getIndexActivo"] == null ||
        store.getters["Trabajadores/getIndexActivo"] == undefined
      ) {
        store.dispatch("Trabajadores/setIndexActivo", 0);
      }
    } else {
      throw Error("Error, arrayTrabajadores no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarCestas", (arrayCestas) => {
  try {
    if (arrayCestas) {
      store.dispatch("Cestas/setArrayCestasAction", arrayCestas);
    } else {
      throw Error("Error, arrayCestas no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarVentas", (arrayTickets) => {
  try {
    if (arrayTickets) {
      store.dispatch("Caja/setArrayVentas", arrayTickets);
    } else {
      throw Error("Error, arrayTickets no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

/* Eze 4.0 */
socket.on("cargarTeclado", (teclado) => {
  try {
    if (teclado) {
      store.dispatch("Teclado/setTeclado", teclado);
    } else {
      throw Error("Error, teclado no es correcto");
    }
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
  socket.sendBuffer = [];
});

socket.on("test", (data) => {
  console.log(data);
});

socket.on("resDatafono", (data) => {
  console.log(data);
});

socket.on("resConsultaPuntos", (data) => {
  if (data.error == false) {
    toast.info(`Puntos del cliente: ${data.info}`);
  } else {
    toast.error(data.mensaje);
  }
});

socket.on("consultaPaytef", (data) => {
  if (data) {
    store.dispatch("Datafono/setEstado", "APROBADA");
  } else {
    store.dispatch("Datafono/setEstado", "DENEGADA");
    setTimeout(() => {
      store.dispatch("Datafono/setEstado", "AGAIN");
    }, 3000);
  }
});

socket.on("consultaPaytefRefund", (data) => {
  if (data) {
    Swal.fire("OK", "Devolución aceptada", "success");
    // store.dispatch("Datafono/setEstado", "APROBADA");
  } else {
    Swal.fire("Oops...", "Devolución denegada", "error");
    // store.dispatch("Datafono/setEstado", "DENEGADA");
    // setTimeout(() => {
    //   store.dispatch("Datafono/setEstado", "AGAIN");
    // }, 3000);
  }
});

// socket.on('resPaytef', (data) => {
//   // store.dispatch('setEsperandoDatafono', false);
//   // if (data.error == false) {
//   //   store.dispatch('Cestas/setIdAction', -1);
//   //   store.dispatch('setModoActual', 'NORMAL');
//   //   store.dispatch('Clientes/resetClienteActivo');
//   //   store.dispatch('Footer/resetMenuActivo');
//   //   router.push({ name: 'Home', params: { tipoToast: 'success', mensajeToast: 'Ticket creado' } });
//   // } else {
//   //   toast.error(data.mensaje);
//   // }
// });

socket.on("resDatafono", (data) => {
  store.dispatch("setEsperandoDatafono", false);
  if (data.error == false) {
    store.dispatch("Cestas/setIdAction", -1);
    store.dispatch("setModoActual", "NORMAL");
    store.dispatch("Clientes/resetClienteActivo");
    store.dispatch("Footer/resetMenuActivo");
    router.push({
      name: "Home",
      params: { tipoToast: "success", mensajeToast: "Ticket creado" },
    });
  } else {
    toast.error(data.mensaje);
  }
});

function emitSocket(canal, datos = null) {
  if (socket.connected) {
    socket.emit(canal, datos);
  }
}

export { socket, emitSocket };
