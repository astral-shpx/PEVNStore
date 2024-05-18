<script setup lang="ts">
import useProductStore from "../piniaStores/useProductsStore";

const productsStore = useProductStore();

const navigateToPage = (new_page: number) => {
  productsStore.navigateToPage(new_page);
};
</script>

<template>
  <div class="flex justify-center w-full my-2">
    <!-- TODO revise usage of page_begin and page_end -->
    <button
      class="mx-2 w-6 rounded-md border dark:hover:bg-slate-700 hover:bg-slate-400"
      :class="{ 'border-2': i === productsStore.page }"
      v-for="i in productsStore.pages_array.slice(
        productsStore.page_begin,
        productsStore.page_end
      )"
      :key="'page-' + i"
      @click="navigateToPage(i)"
    >
      {{ i }}
    </button>
    <!-- <div>...</div> -->
    <!-- last page -->
    <!-- <button
      class="mx-2 w-6 rounded-md border hover:bg-slate-700"
      :class="{ 'border-2': pages.length - 1 === current_page }"
      @click="navigateToPage(pages.length - 1)"
    >
      >|
    </button> -->
    <!-- <div>...</div>
    <div class="flex flex-row">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        @click="navigateToPage(props.pages.length)"
      >
        {{ props.pages.length }}
      </button>
    </div> -->
  </div>
</template>
