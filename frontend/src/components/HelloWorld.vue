<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>

  <div class="search-container">
    <input type="text" placeholder="Search..." class="wavy-search" />
    <button type="submit">Search</button>
  </div>
</template>

<style scoped></style>
