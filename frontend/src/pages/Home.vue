<script setup lang="ts">
import ProductsList from "../components/ProductsList.vue";
import { store } from "../store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  if (route) {
    console.log(route.params.search);
    store.searchQuery = route.params.search as string;
  }
});
</script>

<template>
  <div class="mb-6" v-if="store.searchQuery">
    Search: {{ store.searchQuery }}
  </div>
  <div
    class="flex justify-center items-center mb-6 border sticky top-[8.5rem] dark:bg-slate-600 z-10 rounded-sm select-none"
  >
    filter
  </div>
  <h1 class="mb-4">All products</h1>
  <ProductsList />
</template>
