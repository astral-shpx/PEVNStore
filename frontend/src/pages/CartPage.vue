<script setup lang="ts">
import useCartStore from "../piniaStores/useCartStore";

const cartStore = useCartStore();
</script>

<template>
  <h1>Cart</h1>
  {{ cartStore.cart }}
</template>
