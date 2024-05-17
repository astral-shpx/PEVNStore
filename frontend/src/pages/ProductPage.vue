<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Product } from "../types/product";

const route = useRoute();
const product = ref<Product>();

onMounted(async () => {
  try {
    const resp = await axios.get(`/api/products/one/${route.params.productId}`);
    product.value = resp.data;
    console.log(product.value);
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
  }
});
</script>

<template>
  <div class="flex justify-center items-center mx-2">
    <div>
      <div class="flex justify-center">
        <img
          class="px-2 py-4"
          :src="product?.product_image_url"
          alt=""
          srcset=""
        />
      </div>
      <h1 class="flex justify-center mb-2">
        {{ product?.product_name }}
      </h1>
      <div class="flex justify-center mb-4">
        {{ product?.product_rating }} rating
        {{ product?.customer_reviews }} reviews
      </div>
      <div class="flex justify-center mb-2">$ {{ product?.product_price }}</div>
      <div class="flex justify-center mb-4">
        <button
          class="flex w-2/3 justify-center mb-4 outline-dashed rounded-sm dark:hover:bg-slate-700 hover:bg-slate-400"
        >
          Add to cart
        </button>
      </div>
      <div class="mb-4 mx-2">
        <h2>Description</h2>
        <p>
          {{ product?.product_description }}
        </p>
      </div>

      <div class="mb-4 mx-2">
        <h2>Details</h2>
        <tbody>
          <tr>
            <th>Manufacturer:</th>
            <td>{{ product?.manufacturer }}</td>
          </tr>
          <tr>
            <th>Category:</th>
            <td>{{ product?.product_category }}</td>
          </tr>
          <tr>
            <th>Website:</th>
            <td>{{ product?.product_website }}</td>
          </tr>
          <tr>
            <th>Release date:</th>
            <td>{{ product?.release_date }}</td>
          </tr>
        </tbody>
      </div>
    </div>
  </div>
</template>
