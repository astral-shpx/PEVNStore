<script setup lang="ts">
import { Product } from "../types/product";
defineProps<{ product: Product }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center mb-4">
    <div>
      <h1>{{ product.product_name }}</h1>
      <img :src="product.product_image_url" alt="" />
      <p>Price: ${{ product.product_price }}</p>
    </div>
  </div>
  <div class="w-full"></div>
</template>
