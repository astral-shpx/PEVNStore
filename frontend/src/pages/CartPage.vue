<script setup lang="ts">
import useCartStore from "../piniaStores/useCartStore";
import Toaster from "../components/Toaster.vue";
import useUserStore from "../piniaStores/useUserStore";
import Product from "../components/Product.vue";

const userStotre = useUserStore();
const cartStore = useCartStore();

const clearCart = () => {
  cartStore.clearCart();
};

const removeFromCart = (id: number) => {
  cartStore.removeFromCart(id);
};
</script>

<template>
  <h1 class="mb-4 flex justify-center">Cart</h1>

  <div class="flex justify-center">
    <aside class="hidden md:flex justify-center w-1/4">aside</aside>
    <div class="flex flex-col justify-center md:w-3/5 w-full p-2">
      <div class="flex flex-wrap justify-center">
        <div v-show="cartStore.cartProducts?.length === 0">Cart is empty</div>
        <div
          class="flex flex-col w-1/2 md:w-1/4"
          v-for="cartProduct in cartStore.cartProducts"
        >
          <div
            class="flex flex-col justify-between mb-4 mx-2 cursor-pointer hover:shadow-lg bg-gray-300 rounded dark:bg-gray-700 h-full max-h-96 p-2"
          >
            <Product :product="cartProduct" />

            <div class="flex justify-center">
              <button
                @click="removeFromCart(cartProduct.id)"
                class="flex justify-center outline-dashed rounded-sm dark:hover:bg-slate-500 hover:bg-slate-400 w-full"
              >
                remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap justify-center">
        <div class="flex flex-col justify-center w-1/2 md:w-3/5 p-2">
          <p v-if="!userStotre.user">
            ! You should log in to see your cart and checkout
          </p>

          <div class="flex justify-center w-full mt-4">
            <button
              @click="clearCart"
              class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400 w-4/5"
            >
              Clear cart
            </button>
          </div>

          <form
            class="flex justify-center w-full mt-4"
            action="/api/payment/create-checkout-session"
            method="POST"
            v-if="userStotre.user"
          >
            <button
              class="outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400 w-4/5"
              type="submit"
              id="checkout-button"
            >
              Checkout
            </button>
          </form>
          <div v-else>You must be logged in to checkout.</div>

          <div v-show="cartStore.isEmptyResponse">
            Your cart is empty. Cannot create transaction.
          </div>
        </div>
      </div>
    </div>
  </div>

  <Toaster />
</template>
