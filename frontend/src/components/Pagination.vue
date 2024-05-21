<script setup lang="ts">
import useProductStore from "../piniaStores/useProductsStore";

const productsStore = useProductStore();

const navigateToPage = (new_page: number) => {
  productsStore.navigateToPage(new_page);
};

const nextPage = async () => {
  productsStore.nextPage();
};

const prevPage = async () => {
  productsStore.previousPage();
};
</script>

<template>
  <div class="flex justify-center">
    <div class="w-full md:w-3/5">
      <button
        class="w-1/2 p-2 border rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
        @click="prevPage"
      >
        previous page
      </button>
      <button
        class="w-1/2 p-2 border rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
        @click="nextPage"
      >
        next page
      </button>
    </div>
  </div>

  <div class="flex justify-center w-full my-2">
    <!-- TODO revise usage of page_begin and page_end -->
    <button
      class="mx-2 w-6 rounded-md border dark:hover:bg-slate-700 hover:bg-slate-400"
      :class="{ 'border-2': i === productsStore.page }"
      v-for="i in productsStore.pages_to_show"
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
