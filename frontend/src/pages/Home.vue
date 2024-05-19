<script setup lang="ts">
import ProductsList from "../components/ProductsList.vue";
import { store } from "../store";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Toaster from "../components/Toaster.vue";
import Pagination from "../components/Pagination.vue";

const route = useRoute();

onMounted(() => {
  if (route) {
    store.searchQuery = route.params.search as string;
  }
});
</script>

<template>
  <h1 class="mb-4 flex justify-center">All products</h1>

  <div class="flex justify-center">
    <ProductsList />
  </div>

  <Pagination />

  <Toaster />
</template>
