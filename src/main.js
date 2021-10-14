import { createApp } from "vue";
import App from "./App.vue";
import { store } from "./store";
import { router } from "./router";
import { KellyIO } from "../kellyIO";
// import { ChangeMyNameSkill, GreetSkill } from "../kellyIO/skills";
// import "./registerServiceWorker";

const app = createApp(App);

app.use(store);

app.use(router);

app.use(KellyIO, {
  skills: (baseSkills) => [
    // new GreetSkill(),
    // new ChangeMyNameSkill(),
    ...baseSkills,
  ],
});

app.mount("#app");
