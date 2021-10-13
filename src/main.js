import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import { KellyIO, createKellyIOConfiguration } from "../kellyIO";
// import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.use(
  KellyIO,
  createKellyIOConfiguration({
    confidenceThreshold: 0.5,
    skills: (baseSkills) => [...baseSkills]
  })
);

app.mount("#app");
