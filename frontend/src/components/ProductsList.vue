<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { Product as ProductItem } from "../types/product";

const load_amount = ref(10);

const allProducts = ref<ProductItem[]>([]);
const loading = ref(true);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const resp = await axios.get("api/products", {
      params: {
        limit: load_amount.value,
      },
    });
    allProducts.value = resp.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="flex flex-wrap px-2" role="status">
    <div
      v-for="_ in load_amount"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
      :class="{ hidden: !loading }"
    >
      <div class="mb-4 mx-2">
        <span class="">Loading...</span>
        <LoadingProduct />
      </div>
    </div>

    <div
      v-for="product in allProducts"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 mb-4"
      :class="{ hidden: loading, flex: !loading }"
    >
      <div class="mb-4 mx-2">
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>
