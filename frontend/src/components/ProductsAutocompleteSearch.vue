<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { Product as ProductItem } from "../types/product";
const props = defineProps({
  searchQ: String,
});

const products = ref<ProductItem[]>([]);
const loading = ref(true);
const errorFetching = ref(false);

const fetchProducts = async () => {
  loading.value = true;
  if (!props.searchQ) {
    products.value = [];
    return;
  }
  try {
    // TODO better api search get handling
    const resp = await axios.get(`api/products/search/byname/${props.searchQ}`);
    errorFetching.value = false;
    products.value = resp.data;
  } catch (error) {
    errorFetching.value = true;
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.searchQ,
  () => {
    fetchProducts();
  },
  { immediate: true }
);
</script>

<template>
  <div class="m-2" :class="{ 'animate-pulse': loading }">
    <div v-for="product in products" v-if="!errorFetching">
      <div>
        <h1 class="text-slate-700">{{ product.product_name }}</h1>
        <img :src="product.product_image_url" alt="" />
        <p>Price: ${{ product.product_price }}</p>
      </div>
    </div>
    <div v-else class="flex justify-center">Error fetching</div>
  </div>
</template>

<style scoped></style>
