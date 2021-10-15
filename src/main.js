import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import KellyIO, { GoToSkill, OpenPageSkill } from "../kellyIO";
// import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.use(KellyIO, {
  skills: [GoToSkill, OpenPageSkill],
});

app.mount("#app");
