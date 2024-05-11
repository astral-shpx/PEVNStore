<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import ProductsAutocompleteSearch from "./components/ProductsAutocompleteSearch.vue";
import { ref, computed, onMounted } from "vue";
import { store } from "./store";
import axios from "axios";

// todo
// fix prod docker compose / prod container deployment
// filters :
// release date caledar input
// price slider
// product rating slider
// category dropdown
// reviews asc / desc
//
// desktop styles
// login page
// account page
// favourites page
// payments
// checkout page
// better pagination

const isMenuOpen = ref(false);
const categories = ref([]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const fetchCategories = async () => {
  try {
    const resp = await axios.get("/api/products/categories");
    categories.value = resp.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

const showAutocompleteComponent = computed(
  () => store.typingSearchQuery !== "" && store.showAutocomplete
);

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div
    :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }"
    class="fixed left-0 top-20 z-50 transition-transform duration-500 h-5/6 w-3/5 overflow-scroll overscroll-contain"
  >
    <div
      class="p-4 shadow-md bg-white dark:bg-slate-700"
      v-for="cat in categories"
    >
      <RouterLink
        :to="`/category/${cat}`"
        class="flex justify-between cursor-pointer"
      >
        <span>{{ cat }}</span
        ><span>></span>
      </RouterLink>
    </div>
  </div>
  <div class="sticky top-0 bg-white dark:bg-gray-700 mb-4">
    <nav class="flex">
      <svg
        @click="toggleMenu"
        class="w-14 mt-4 mx-2 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 10 10"
        stroke="#eee"
        stroke-width=".6"
        fill="rgba(0,0,0,0)"
        stroke-linecap="round"
        style="cursor: pointer"
      >
        <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
          <animate
            dur="0.2s"
            attributeName="d"
            values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
            fill="freeze"
            begin="start.begin"
          />
          <animate
            dur="0.2s"
            attributeName="d"
            values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
            fill="freeze"
            begin="reverse.begin"
          />
        </path>
        <rect width="10" height="10" stroke="none">
          <animate dur="2s" id="reverse" attributeName="width" begin="click" />
        </rect>
        <rect width="10" height="10" stroke="none">
          <animate
            dur="0.001s"
            id="start"
            attributeName="width"
            values="10;0"
            fill="freeze"
            begin="click"
          />
          <animate
            dur="0.001s"
            attributeName="width"
            values="0;10"
            fill="freeze"
            begin="reverse.begin"
          />
        </rect>
      </svg>
      <RouterLink class="w-10 mt-4 mx-2" to="/">Go to Home</RouterLink>
    </nav>
    <SearchBar />
  </div>
  <main>
    <RouterView />
  </main>
  <div
    v-if="showAutocompleteComponent"
    class="fixed top-32 left-4 right-4 z-50 bg-slate-200 rounded-lg text-black overflow-scroll overscroll-contain h-4/5"
  >
    <ProductsAutocompleteSearch :search-q="store.typingSearchQuery" />
  </div>
</template>

<style scoped></style>
