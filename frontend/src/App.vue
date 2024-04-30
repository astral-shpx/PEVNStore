<script setup lang="ts">
import SearchBar from "./components/SearchBar.vue";
</script>

<template>
  <div class="sticky top-0 bg-white dark:bg-slate-600 mb-4">
    <nav>
      <RouterLink to="/">Go to Home</RouterLink>
    </nav>
    <SearchBar />
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
