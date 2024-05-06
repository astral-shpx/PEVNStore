<script setup lang="ts">
import { Product } from "../types/product";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<{ product: Product }>();

const navigateToProduct = async () => {
  try {
    console.log("navigating to ", props.product.id);
    router.push(`/product/${props.product.id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center mb-4 cursor-pointer"
    @click="navigateToProduct"
  >
    <div>
      <h1>{{ product.product_name }}</h1>
      <img :src="product.product_image_url" alt="" />
      <p>Price: ${{ product.product_price }}</p>
    </div>
  </div>
  <div class="w-full"></div>
</template>
