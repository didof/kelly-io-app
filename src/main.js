import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import KellyIO, { GoToSkill } from "../kellyIO";
// import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.use(KellyIO, {
  skills: [GoToSkill],
});

app.mount("#app");
