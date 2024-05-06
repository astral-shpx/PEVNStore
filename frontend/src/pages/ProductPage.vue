<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Product } from "../types/product";

const route = useRoute();
const product = ref<Product>();

onMounted(async () => {
  try {
    const resp = await axios.get(`/api/products/one/${route.params.productId}`);
    product.value = resp.data;
    console.log(product.value);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
  }
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div>
      {{ product?.id }}
    </div>
  </div>
</template>
