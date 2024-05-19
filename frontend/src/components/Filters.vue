<script setup lang="ts">
import { watch } from "vue";
import { useRouter } from "vue-router";
import useProductStore from "../piniaStores/useProductsStore";

const router = useRouter();
const productsStore = useProductStore();

watch(
  () => productsStore.filters.toDate,
  (date) => {
    // console.log(productsStore.filters.toDate);
    // console.log(date);
    // add to query
    router.push({ query: { toDate: productsStore.filters.toDate } });
  }
);
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
      v-model="productsStore.filters.fromDate"
    />
    <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
    <input
      class="text-slate-800"
      type="date"
      name="fromDate"
      id=""
      v-model="productsStore.filters.toDate"
    />
  </div>
</template>
