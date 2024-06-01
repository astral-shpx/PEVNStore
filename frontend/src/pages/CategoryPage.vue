<script setup lang="ts">
import { watch, ref } from "vue";
import { useRoute } from "vue-router";
import ProductsList from "../components/ProductsList.vue";
import Toaster from "../components/Toaster.vue";
import Pagination from "../components/Pagination.vue";
import useProductStore from "../piniaStores/useProductsStore";
import useFiltersStore from "../piniaStores/useFiltersStore";

const productsStore = useProductStore();
const filtersStore = useFiltersStore();
const route = useRoute();
const cat = ref("");

watch(
  () => route.params.category,
  async () => {
    productsStore.page = 1;
    filtersStore.reset();
    cat.value = route.params.category as string;
  },
  { immediate: true }
);
</script>

<template>
  <h1 class="mb-4">{{ route.params.category as string }}</h1>
  <ProductsList :category="(route.params.category as string)" />

  <Pagination />

  <Toaster />
</template>
