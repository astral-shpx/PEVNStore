<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "axios";
import { Product as ProductItem } from "../types/product";
const props = defineProps({
  searchQ: String,
});

const products = ref<ProductItem[]>([]);

const fetchProducts = async () => {
  if (!props.searchQ) {
    products.value = [];
    return;
  }
  try {
    const resp = await axios.get(`api/products/search/byname/${props.searchQ}`);
    products.value = resp.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
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
  <div class="m-2">
    <div v-for="product in products">
      <div class="">
        <h1 class="text-slate-700">{{ product.product_name }}</h1>
        <img :src="product.product_image_url" alt="" />
        <p>Price: ${{ product.product_price }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
