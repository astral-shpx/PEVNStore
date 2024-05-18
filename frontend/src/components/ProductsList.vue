<script setup lang="ts">
import { onMounted, watch } from "vue";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { store } from "../store";
import Toaster from "./Toaster.vue";
import useProductStore from "../piniaStores/useProductsStore";
import Pagination from "./Pagination.vue";

const productsStore = useProductStore();

const props = defineProps({
  category: String,
  filters: Object,
});

const fetchProducts = async () => {
  productsStore.fetchProducts(props.category ?? "");
  // console.log("productStore.load_amount", productStore.load_amount);
};

const nextPage = async () => {
  productsStore.nextPage();
};

const prevPage = async () => {
  productsStore.previousPage();
};

onMounted(fetchProducts);
watch(
  () => store.searchQuery,
  async () => {
    fetchProducts();
  },
  { immediate: true }
);
watch(
  () => props.category,
  () => {
    fetchProducts();
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex">
    <div class="flex flex-wrap px-2 md:w-4/5 justify-center" role="status">
      <div
        v-for="_ in productsStore.load_amount"
        class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse -z-10"
        :class="{ hidden: !productsStore.loading }"
      >
        <div class="mb-4 mx-2">
          <LoadingProduct />
        </div>
      </div>

      <div
        v-for="product in productsStore.products"
        class="flex flex-col w-1/2 md:w-1/4"
        :class="{ hidden: productsStore.loading, flex: !productsStore.loading }"
      >
        <div
          class="mb-4 mx-2 cursor-pointer hover:shadow-lg bg-gray-300 rounded dark:bg-gray-700 h-full p-2"
        >
          <Product :product="product" />
        </div>
      </div>

      <h2
        v-if="productsStore.products.every((el) => !el)"
        class="flex justify-center items-center w-full mb-6"
      >
        No results
      </h2>
    </div>

    <aside class="hidden md:flex">
      <div class="bg-white dark:bg-slate-700 w-full mb-3 p-2 rounded-md">
        <!-- TODO MOVE TO COMPONENT -->
        <h2>Filters</h2>
        <h3 class="mb-2">Release date</h3>
        <label for="fromDate" class="bg-white dark:bg-slate-700"> From </label>
        <input class="text-slate-800" type="date" name="toDate" id="" />
        <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
        <input class="text-slate-800" type="date" name="fromDate" id="" />
      </div>
    </aside>
  </div>

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

  <Pagination />

  <Toaster />
</template>
