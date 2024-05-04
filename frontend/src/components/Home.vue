<script setup lang="ts">
import ProductsList from "./ProductsList.vue";
import { store } from "../store";
</script>

<template>
  <div class="mb-6" v-if="store.searchQuery">
    Search: {{ store.searchQuery }}
  </div>
  <div
    class="flex justify-center items-center mb-6 border sticky top-[8.5rem] dark:bg-slate-600 z-10 rounded-sm"
  >
    filter
  </div>
  <ProductsList />
</template>
