import { createApp } from "vue";
import "./style.css";
import router from "./router";
import App from "./App.vue";
import axios from "./plugins/axios";

const app = createApp(App);

app.use(router);
app.use(axios, {
  baseUrl: "http://localhost:3001/",
});

app.mount("#app");
