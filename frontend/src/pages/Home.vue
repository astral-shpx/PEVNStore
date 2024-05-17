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
  <h1 class="mb-4 flex justify-center">All products</h1>
  <ProductsList />
</template>
