import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";

const routes = [
  // { path: "/search/:search", component: Home },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
