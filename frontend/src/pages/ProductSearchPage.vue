<script setup lang="ts">
import ProductsList from "../components/ProductsList.vue";
import { store } from "../store";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  if (route) {
    console.log(route.params.search);
    store.searchQuery = route.params.search as string;
  }
});
const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div>
    <!-- Overlay -->
    <div v-if="isMenuOpen" @click="toggleMenu" class="fixed inset-0 z-40"></div>

    <!-- Sliding Menu -->
    <div
      :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }"
      class="fixed left-0 top-44 z-50 transition-transform duration-500 w-4/5 h-3/5 rounded-r-md overflow-scroll overscroll-contain"
    >
      <div
        @click="toggleMenu"
        class="p-2 flex justify-center sticky top-0 cursor-pointer bg-white dark:bg-slate-700 hover:dark:bg-slate-800"
      >
        Close
      </div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
      <div class="p-4 shadow-md bg-white dark:bg-slate-700">Filters</div>
    </div>
  </div>
  <h2 class="mb-6" v-if="store.searchQuery">Search: {{ store.searchQuery }}</h2>
  <div
    @click="toggleMenu"
    class="flex justify-center items-center mb-6 border sticky top-[8.5rem] dark:bg-slate-600 z-10 rounded-sm select-none"
  >
    filter
  </div>
  <ProductsList v-if="store.searchQuery" />
</template>
