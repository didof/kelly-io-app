import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import { KellyIO } from "../kellyIO";
// import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.use(KellyIO, {
    prefix: 'kelly',
    confidenceThreshold: 0.5
});

app.mount("#app");
