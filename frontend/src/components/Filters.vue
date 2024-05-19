<script setup lang="ts">
import { watch } from "vue";
import { store } from "../store";

const filters = store.filters;

watch(
  () => filters.toDate,
  (date) => {
    console.log(filters.toDate);
    console.log(date);
    // add to query
  }
);

watch(
  () => filters.fromDate,
  (date) => {
    console.log(filters.fromDate);
    console.log(date);
    // add to query
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
      v-model="filters.fromDate"
    />
    <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
    <input
      class="text-slate-800"
      type="date"
      name="fromDate"
      id=""
      v-model="filters.toDate"
    />
  </div>
</template>
