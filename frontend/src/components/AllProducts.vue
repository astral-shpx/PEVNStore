<script lang="ts">
import { defineComponent } from "vue";
import LoadingProduct from "./LoadingProduct.vue";
import Product from "./Product.vue";
import type { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    catTags: string[];
  }
}

export default defineComponent({
  components: { LoadingProduct, Product },
  data() {
    return {
      items: [
        { message: "Foo" },
        { message: "Bar" },
        { message: "Baz" },
        { message: "Qux" },
      ],
      allproducts: [],
      loading: true,
    };
  },
  methods: {
    async fetchProducts() {
      const resp = await this.$axios.get("/products/all");
      console.log(resp.data);

      this.allproducts = resp.data;
    },
  },
  async mounted() {
    this.loading = true;
    await this.fetchProducts();
    this.loading = false;
  },
});
</script>

<template>
  <div class="mb-6">Search: ...</div>
  <div
    class="flex justify-center items-center mb-6 border sticky top-32 bg-slate-600"
  >
    filter
  </div>
  <div class="flex flex-wrap px-2" role="status">
    <div
      v-for="item in items"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 animate-pulse"
      :class="{ hidden: !loading, flex: loading }"
    >
      <div class="mb-4 mx-2">
        <span class="">Loading...</span>
        <LoadingProduct />
        {{ item.message }}
      </div>
    </div>

    <div
      v-for="product in allproducts"
      class="flex flex-col w-1/2 bg-gray-300 rounded dark:bg-gray-700 mb-4"
      :class="{ hidden: loading, flex: !loading }"
    >
      <div class="mb-4 mx-2">
        <Product :product="product" />
      </div>
    </div>
  </div>
</template>
