<script setup lang="ts">
import { Product } from "../types/product";
import useUserStore from "../piniaStores/useUserStore";

const userStotre = useUserStore();

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
  <div class="flex justify-center" v-if="userStotre.user">
    <div
      class="flex justify-center outline-dashed rounded-sm dark:hover:bg-slate-500 hover:bg-slate-400 w-10/12 mr-3"
    >
      add to cart
    </div>
    <div
      class="flex justify-center outline-dashed rounded-sm dark:hover:bg-slate-500 hover:bg-slate-400 w-2/12"
    >
      ⭐
    </div>
  </div>
</template>
