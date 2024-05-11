<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import ProductsList from "../components/ProductsList.vue";

const route = useRoute();
const cat = ref("");

watch(
  () => route.params.category,
  async () => {
    console.log(route.params.category);
    cat.value = route.params.category as string;
  },
  { immediate: true }
);
</script>

<template>
  <h1 class="mb-4">{{ route.params.category as string }}</h1>
  <ProductsList :category="(route.params.category as string)" />
</template>
