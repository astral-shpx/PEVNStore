<script setup lang="ts">
import { ref } from "vue";
import { store } from "../store";
const search = ref("");

const typingSearch = () => {
  console.log(search.value);
  store.typingSearchQuery = search.value;
};

const submitSearch = () => {
  store.searchQuery = search.value as string;
};
</script>

<template>
  <div class="flex flex-wrap w-full p-4">
    <input
      @keyup="typingSearch"
      v-model="search"
      class="flex-grow w-1 p-2 border border-r-0 rounded-l-lg text-black z-30"
      type="text"
      placeholder="Search..."
    />
    <button
      @click="submitSearch"
      class="flex-none bg-lime-600 text-white p-2 border rounded-r-lg z-30"
      type="submit"
    >
      <img
        class=""
        src="../assets/icons8-search-24.png"
        alt="search"
        srcset=""
      />
    </button>
  </div>
</template>

<style scoped></style>
