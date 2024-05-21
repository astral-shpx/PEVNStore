<script setup lang="ts">
import { watch } from "vue";
import useProductStore from "../piniaStores/useProductsStore";

const productsStore = useProductStore();

const { filters, fetchProducts } = productsStore;

const updateFromDate = (event: Event) => {
  filters.fromDate = (event.target as HTMLInputElement).value;
  fetchProducts();
};

const updateToDate = (event: Event) => {
  filters.toDate = (event.target as HTMLInputElement).value;
  fetchProducts();
};

watch(filters, async () => {
  await productsStore.fetchProducts();
});
</script>

<template>
  <div class="bg-white dark:bg-slate-700 w-full mb-3 p-2 rounded-md">
    <h3 class="mb-2">Release date</h3>
    <label for="fromDate" class="bg-white dark:bg-slate-700"> From </label>
    <input
      class="text-slate-800"
      type="date"
      name="toDate"
      id=""
      v-model="filters.fromDate"
      @input="updateFromDate"
    />
    <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
    <input
      class="text-slate-800"
      type="date"
      name="fromDate"
      id=""
      v-model="filters.toDate"
      @input="updateToDate"
    />
  </div>
</template>
