<script setup lang="ts">
import { onMounted, watch } from "vue";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { store } from "../store";
import useProductStore from "../piniaStores/useProductsStore";

const productsStore = useProductStore();

const props = defineProps({
  category: String,
  filters: Object,
});

const fetchProducts = async () => {
  productsStore.fetchProducts(props.category ?? "");
  // console.log("productStore.load_amount", productStore.load_amount);
};

onMounted(fetchProducts);
watch(
  () => store.searchQuery,
  async () => {
    fetchProducts();
  },
  { immediate: true }
);
watch(
  () => props.category,
  () => {
    fetchProducts();
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
        class="mb-4 mx-2 cursor-pointer hover:shadow-lg bg-gray-300 rounded dark:bg-gray-700 h-full p-2"
      >
        <Product :product="product" />
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
