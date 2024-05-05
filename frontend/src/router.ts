import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import ProductSearchPage from "./pages/ProductSearchPage.vue";

const routes = [
  { path: "/:search", component: ProductSearchPage },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
