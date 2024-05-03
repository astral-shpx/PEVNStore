<script setup lang="ts">
const props = defineProps({
  searchQ: String,
});
</script>

<template>
  <div class="m-2">{{ props.searchQ }}</div>
</template>

<style scoped></style>
