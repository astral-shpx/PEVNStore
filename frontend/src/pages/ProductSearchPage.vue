<script setup lang="ts">
import ProductsList from "../components/ProductsList.vue";
import { store } from "../store";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Toaster from "../components/Toaster.vue";
import Pagination from "../components/Pagination.vue";

const route = useRoute();

const filters = ref({});
const toDate = ref("");
const fromDate = ref("");

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

watch(toDate, (date) => {
  console.log(toDate);
  console.log(date);
});
watch(fromDate, (date) => {
  console.log(fromDate);
  console.log(date);
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
      <!-- filters -->
      <div class="bg-white dark:bg-slate-700 w-full mb-3">
        <h3 class="mb-2">Release date</h3>
        <label for="fromDate" class="bg-white dark:bg-slate-700"> From </label>
        <input
          class="text-slate-800"
          type="date"
          name="toDate"
          id=""
          v-model="fromDate"
        />
        <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
        <input
          class="text-slate-800"
          type="date"
          name="fromDate"
          id=""
          v-model="toDate"
        />
      </div>
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
    <ProductsList v-if="store.searchQuery" :filters="filters" />

    <aside class="hidden md:flex">
      <div class="bg-white dark:bg-slate-700 w-full mb-3 p-2 rounded-md">
        <!-- TODO MOVE TO COMPONENT -->
        <h2>Filters</h2>
        <h3 class="mb-2">Release date</h3>
        <label for="fromDate" class="bg-white dark:bg-slate-700"> From </label>
        <input class="text-slate-800" type="date" name="toDate" id="" />
        <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
        <input class="text-slate-800" type="date" name="fromDate" id="" />
      </div>
    </aside>
  </div>

  <Pagination />

  <Toaster />
</template>
