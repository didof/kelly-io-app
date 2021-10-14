import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "./pages/Homepage";
import Morsecode from "./pages/Morsecode";

const routes = [
  { path: "/", name: "home", component: Homepage },
  {
    path: "/morse",
    name: "morse",
    component: Morsecode,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
