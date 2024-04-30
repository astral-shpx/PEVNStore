<script setup lang="ts">
import LoadingProduct from "./LoadingProduct.vue";
import { ref } from "vue";
const items = ref([
  { message: "Foo" },
  { message: "Bar" },
  { message: "Baz" },
  { message: "Qux" },
]);
</script>

<template>
  <!-- animate-pulse -->
  <div class="flex flex-wrap" role="status">
    <div v-for="_ in items" class="flex flex-col w-1/2">
      <div class="mb-4 mx-2">
        <LoadingProduct />
        <!-- {{ item.message }} -->
      </div>
    </div>

    <span class="sr-only">Loading...</span>
  </div>
</template>
