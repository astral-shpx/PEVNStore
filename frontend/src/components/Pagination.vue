<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface PaginationProps {
  pages: number[];
}

withDefaults(defineProps<PaginationProps>(), {
  pages: () => [1],
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
      :class="{ 'border-2': i === 1 }"
      v-for="i in pages.slice(0, 5)"
      :key="'page-' + i"
      @click="navigateToPage(i)"
    >
      {{ i }}
    </button>
    <div>...</div>
    <div class="flex flex-row">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        :class="{ 'border-2': i === 12 }"
        v-for="i in pages.slice(-3)"
        :key="'page-' + i"
        @click="navigateToPage(i)"
      >
        {{ i }}
      </button>
    </div>
  </div>
</template>
