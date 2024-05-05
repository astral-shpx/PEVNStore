import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import ProductSearchPage from "./pages/ProductSearchPage.vue";
import ProductPage from "./pages/ProductPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/:search", component: ProductSearchPage },
  { path: "/product/:productId", component: ProductPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
