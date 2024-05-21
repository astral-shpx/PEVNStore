<script setup lang="ts">
import { Product } from "../types/product";

const props = defineProps<{ product: Product }>();
</script>

<template>
  <RouterLink
    class="flex flex-col items-center justify-center mb-4 cursor-pointer"
    :to="`/product/${props.product.id}`"
  >
    <div class="w-full object-scale-down">
      <h1 class="text-ellipsis overflow-hidden">{{ product.product_name }}</h1>
      <img :src="product.product_image_url" alt="" />
      <p>Price: ${{ product.product_price }}</p>
    </div>
  </RouterLink>
</template>
