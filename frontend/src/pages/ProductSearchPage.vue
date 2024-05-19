<script setup lang="ts">
import ProductsList from "../components/ProductsList.vue";
import { store } from "../store";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Toaster from "../components/Toaster.vue";
import Pagination from "../components/Pagination.vue";
import Filters from "../components/Filters.vue";
import useProductStore from "../piniaStores/useProductsStore";

const productsStore = useProductStore();
const route = useRoute();

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  if (route) {
    store.searchQuery = route.params.search as string;
  }
});
</script>

<template>
  <div>
    <!-- Overlay -->
    <div v-if="isMenuOpen" @click="toggleMenu" class="fixed inset-0 z-40"></div>

    <!-- Sliding Menu -->
    <div
      :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }"
      class="fixed left-0 top-44 z-50 transition-transform duration-500 w-4/5 h-3/5 bg-white dark:bg-slate-700 rounded-r-md overflow-scroll overscroll-contain"
    >
      <div
        @click="toggleMenu"
        class="p-2 flex justify-center sticky top-0 cursor-pointer bg-white dark:bg-slate-700 dark:hover:bg-slate-800 hover:bg-slate-300"
      >
        Close
      </div>

      <Filters />
    </div>
  </div>

  <h2 class="mb-6" v-if="store.searchQuery">Search: {{ store.searchQuery }}</h2>

  <div
    @click="toggleMenu"
    class="flex justify-center items-center mb-6 border sticky top-[8.5rem] bg-slate-200 dark:bg-slate-600 z-10 rounded-sm select-none cursor-pointer md:hidden"
  >
    Filters
  </div>

  <div class="flex">
    <ProductsList v-if="store.searchQuery" :filters="productsStore.filters" />

    <aside class="hidden md:flex">
      <Filters />
    </aside>
  </div>

  <Pagination />

  <Toaster />
</template>
