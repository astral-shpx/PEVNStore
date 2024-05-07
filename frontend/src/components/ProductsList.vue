<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import { Product as ProductItem } from "../types/product";
import { store } from "../store";
import Toaster from "./Toaster.vue";
import useToasterStore from "../piniaStores/useToasterStore";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const toasterStore = useToasterStore();

const load_amount = ref(10);
const total_amount = ref(10);
const page_num = ref((route.query.page as unknown as number) || 0);
const total_pages = ref(0);

const products = ref<ProductItem[]>([]);
const loading = ref(true);

const fetchProducts = async () => {
  loading.value = true;
  try {
    const resp = await axios.get("/api/products", {
      params: {
        limit: load_amount.value,
        productName: store.searchQuery,
        offset: page_num.value * load_amount.value,
      },
    });
    products.value = resp.data.products;
    total_amount.value = resp.data.count;
    router.replace({ query: { page: page_num.value } }); //
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
    total_pages.value = Math.ceil(total_amount.value / load_amount.value);
  }
};

const nextPage = async () => {
  if (page_num.value < total_pages.value - 1) {
    page_num.value++;
    await fetchProducts();
  } else {
    toasterStore.error({ text: "No more pages to load." });
  }
};

const prevPage = async () => {
  if (page_num.value > 0) {
    page_num.value--;
    await fetchProducts();
  } else {
    toasterStore.error({ text: "No more pages to navigate back to." });
  }
};

// todo move to component
const navigateToPage = async (page: number) => {
  page_num.value = page - 1;
  router.replace({ query: { page: page_num.value } });
  await fetchProducts();
};

onMounted(fetchProducts);
watch(
  () => store.searchQuery,
  async () => {
    fetchProducts();
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-wrap px-2" role="status">
    <div
      v-for="_ in load_amount"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse -z-10"
      :class="{ hidden: !loading }"
    >
      <div class="mb-4 mx-2">
        <LoadingProduct />
      </div>
    </div>

    <div
      v-for="product in products"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 mb-4"
      :class="{ hidden: loading, flex: !loading }"
    >
      <div class="mb-4 mx-2 cursor-pointer">
        <Product :product="product" />
      </div>
    </div>

    <h2
      v-if="products.every((el) => !el)"
      class="flex justify-center items-center w-full mb-6"
    >
      No results
    </h2>

    <div class="flex flex-row w-full">
      <button
        class="w-1/2 p-2 border rounded-sm hover:bg-slate-700"
        @click="prevPage"
      >
        previous page
      </button>
      <button
        class="w-1/2 p-2 border rounded-sm hover:bg-slate-700"
        @click="nextPage"
      >
        next page
      </button>
    </div>

    <!-- TODO move to component -->
    <div class="flex justify-center w-full my-2">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        v-for="i in total_pages < 5 ? total_pages : 5"
        @click="navigateToPage(i)"
      >
        {{ i }}
      </button>
      <div>...</div>
      <div class="flex flex-row-reverse" v-if="total_pages > 7">
        <button
          class="mx-2 w-6 rounded-md border hover:bg-slate-700"
          v-for="i in 3"
          @click="navigateToPage(total_pages - i)"
        >
          {{ total_pages - i }}
        </button>
      </div>
    </div>

    <Toaster />
  </div>
</template>
