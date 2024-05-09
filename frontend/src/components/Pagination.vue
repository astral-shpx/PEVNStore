<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface PaginationProps {
  total_pages: number;
  current_page: number;
}

withDefaults(defineProps<PaginationProps>(), {
  total_pages: 1,
  current_page: 1,
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
      :class="{ 'border-2': i === current_page }"
      v-for="i in total_pages < 5 ? total_pages : 5"
      :key="'page-' + i"
      @click="navigateToPage(i)"
    >
      {{ i }}
    </button>
    <div v-if="total_pages > 5">...</div>
    <div class="flex flex-row-reverse" v-if="total_pages > 7">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        v-for="i in 3"
        :key="'page-' + (total_pages - i)"
        @click="navigateToPage(total_pages - i)"
      >
        {{ total_pages - i }}
      </button>
    </div>
  </div>
</template>
