<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { Product as ProductItem } from "../types/product";
import { store } from "../store";

const load_amount = ref(10);
const page_num = ref(0);

const products = ref<ProductItem[]>([]);
const loading = ref(true);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const resp = await axios.get("api/products", {
      params: {
        limit: load_amount.value,
        productName: store.searchQuery,
        offset: page_num.value * load_amount.value,
      },
    });
    products.value = resp.data.products;
    load_amount.value = resp.data.count;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

const nextPage = async () => {
  const totalPages = Math.ceil(load_amount.value / load_amount.value) - 1;

  console.log(
    "Moving from page",
    page_num.value,
    "to page",
    page_num.value + 1
  );

  if (page_num.value < totalPages) {
    page_num.value++;
    await fetchProducts();
  } else {
    console.log("No more pages to load.");
  }
};

const prevPage = async () => {
  if (page_num.value > 0) {
    page_num.value--;
    await fetchProducts();
  } else {
    console.log("No more pages to navigate back to.");
  }
};

onMounted(fetchProducts);
watch(
  () => store.searchQuery,
  async () => {
    fetchProducts();
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-wrap px-2" role="status">
    <div
      v-for="_ in load_amount"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse -z-10"
      :class="{ hidden: !loading }"
    >
      <div class="mb-4 mx-2">
        <LoadingProduct />
      </div>
    </div>

    <div
      v-for="product in products"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 mb-4"
      :class="{ hidden: loading, flex: !loading }"
    >
      <div class="mb-4 mx-2">
        <Product :product="product" />
      </div>
    </div>

    <div class="flex flex-row w-full">
      <button class="w-1/2" @click="prevPage">previous page</button>
      <button class="w-1/2" @click="nextPage">next page</button>
    </div>
  </div>
</template>
