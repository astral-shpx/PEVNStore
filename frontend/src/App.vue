<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
import { ref } from "vue";

// todo
// implement offset and take for products pagination
// menu for categories
// search
// search error message and products
// product page
// login page
// checkout page
// favourites page
// desktop styles

const isMenuOpen = ref(false);

const openMenu = () => {
  console.log("hello");

  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div
    :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }"
    class="fixed left-0 top-16 z-10 transition-transform duration-500"
  >
    <div class="p-4 shadow-md bg-white dark:bg-slate-600">hello</div>
  </div>
  <div class="sticky top-0 bg-white dark:bg-slate-600 mb-4">
    <nav class="flex">
      <img
        @click="openMenu"
        class="w-10 mt-4 mx-2 cursor-pointer"
        src="./assets/list.png"
        alt=""
        srcset=""
      />
      <RouterLink class="w-10 mt-4 mx-2" to="/">Go to Home</RouterLink>
    </nav>
    <SearchBar />
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
