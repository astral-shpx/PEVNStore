<script setup lang="ts">
import useCartStore from "../piniaStores/useCartStore";
// import axios from "axios";

const cartStore = useCartStore();

// const testPayment = async () => {
//   const resp = await axios.post("/api/payment/create-checkout-session");
// };
</script>

<template>
  <h1>Cart</h1>
  {{ cartStore.cart }}
  <form action="/api/payment/create-checkout-session" method="POST">
    <button type="submit" id="checkout-button">Checkout</button>
  </form>
</template>
