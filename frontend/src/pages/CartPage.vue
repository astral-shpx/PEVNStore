<script setup lang="ts">
import useCartStore from "../piniaStores/useCartStore";

const cartStore = useCartStore();
</script>

<template>
  <h1>Cart</h1>
  {{ cartStore.cart }}
  <p>! You should log in to see your cart</p>
  <p>! and checkout</p>
  <form action="/api/payment/create-checkout-session" method="POST">
    <button type="submit" id="checkout-button">
      Checkout (redirect to login if not logged in)
    </button>
  </form>
</template>
