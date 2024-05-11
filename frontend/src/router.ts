import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import ProductSearchPage from "./pages/ProductSearchPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import CategoryPage from "./pages/CategoryPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/:search", component: ProductSearchPage },
  { path: "/product/:productId", component: ProductPage },
  { path: "/category/:category", component: CategoryPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
