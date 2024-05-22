import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/Home.vue";
import ProductSearchPage from "./pages/ProductSearchPage.vue";
import ProductPage from "./pages/ProductPage.vue";
import CategoryPage from "./pages/CategoryPage.vue";
import AccountPage from "./pages/AccountPage.vue";
import CartPage from "./pages/CartPage.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/:search", component: ProductSearchPage },
  { path: "/product/:productId", component: ProductPage },
  { path: "/category/:category", component: CategoryPage },
  { path: "/account", component: AccountPage },
  { path: "/cart", component: CartPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
