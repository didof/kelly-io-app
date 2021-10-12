import { createRouter, createWebHashHistory } from "vue-router";
import Homepage from "./pages/Homepage";
import Morsecode from "./pages/Morsecode";

const routes = [
  { path: "/", component: Homepage },
  { path: "/morsecode", component: Morsecode },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
