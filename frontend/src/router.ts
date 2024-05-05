import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import ProductPage from "./pages/ProductPage.vue";

const routes = [
  { path: "/:search", component: ProductPage },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
