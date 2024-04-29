import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue";

const routes = [
  { path: "/hello", component: HelloWorld },
  { path: "/", component: Home },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
