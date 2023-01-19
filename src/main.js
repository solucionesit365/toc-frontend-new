import "mdb-vue-ui-kit/css/mdb.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
require("./services/sockets");
axios.defaults.baseURL = "http://localhost:3000";
createApp(App).use(store).use(router).mount("#app");
