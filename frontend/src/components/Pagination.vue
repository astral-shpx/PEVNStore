<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface PaginationProps {
  beginning_pages: number[];
  ending_pages: number[];
}

withDefaults(defineProps<PaginationProps>(), {
  beginning_pages: () => [1],
  ending_pages: () => [1],
});

const emits = defineEmits(["pageChange"]);

const navigateToPage = (page: number) => {
  emits("pageChange", page);
};
</script>

<template>
  <div class="flex justify-center w-full my-2">
    <button
      class="mx-2 w-6 rounded-md border hover:bg-slate-700"
      :class="{ 'border-2': i === 0 }"
      v-for="i in beginning_pages"
      :key="'page-' + i"
      @click="navigateToPage(i)"
    >
      {{ i + 1 }}
    </button>
    <div>...</div>
    <div class="flex flex-row">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        :class="{ 'border-2': i === 11 }"
        v-for="i in ending_pages"
        :key="'page-' + i"
        @click="navigateToPage(i)"
      >
        {{ i + 1 }}
      </button>
    </div>
  </div>
</template>
