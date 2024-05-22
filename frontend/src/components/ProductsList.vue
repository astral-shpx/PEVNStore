<script setup lang="ts">
import { onMounted, watch } from "vue";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { store } from "../store";
import useProductStore from "../piniaStores/useProductsStore";
import useUserStore from "../piniaStores/useUserStore";

const userStotre = useUserStore();
const productsStore = useProductStore();

const props = defineProps({
  category: String,
  filters: Object,
});

const fetchProducts = async () => {
  productsStore.fetchProducts(props.category ?? "");
};

onMounted(fetchProducts);

watch(
  [() => store.searchQuery, () => props.category],
  async () => {
    await fetchProducts();
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-wrap px-2 md:w-10/12 justify-center" role="status">
    <div
      v-for="_ in productsStore.load_amount"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse -z-10"
      :class="{ hidden: !productsStore.loading }"
    >
      <div class="mb-4 mx-2">
        <LoadingProduct />
      </div>
    </div>

    <div
      v-for="product in productsStore.products"
      class="flex flex-col w-1/2 md:w-1/4"
      :class="{ hidden: productsStore.loading, flex: !productsStore.loading }"
    >
      <div
        class="flex flex-col justify-between mb-4 mx-2 cursor-pointer hover:shadow-lg bg-gray-300 rounded dark:bg-gray-700 h-full p-2"
      >
        <Product :product="product" />

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
      </div>
    </div>

    <h2
      v-if="productsStore.products.every((el) => !el)"
      class="flex justify-center items-center w-full mb-6"
    >
      No results
    </h2>
  </div>
</template>
