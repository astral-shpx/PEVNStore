<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

interface PaginationProps {
  pages: number[];
}

const props = withDefaults(defineProps<PaginationProps>(), {
  pages: () => [1],
});

// todo move this to store
const current_page = ref((route.query.page as unknown as number) || 1);
const page_begin = ref(0);
const page_end = ref(5);

const emits = defineEmits(["pageChange"]);

const navigateToPage = (new_page: number) => {
  const direction = Math.sign(new_page - current_page.value);
  const canShiftForward =
    direction > 0 && page_end.value < props.pages.length - 1;
  const canShiftBackward = direction < 0 && page_begin.value > 0;

  if (canShiftForward || canShiftBackward) {
    page_begin.value += direction;
    page_end.value += direction;
    console.log("page_beign", page_begin.value);
    console.log("page_end", page_end.value);
  }

  current_page.value = new_page;

  emits("pageChange", new_page);
};
</script>

<template>
  <div class="flex justify-center w-full my-2">
    <button
      class="mx-2 w-6 rounded-md border hover:bg-slate-700"
      :class="{ 'border-2': i === current_page }"
      v-for="i in pages.slice(page_begin, page_end)"
      :key="'page-' + i"
      @click="navigateToPage(i)"
    >
      {{ i }}
    </button>
    <!-- last page -->
    <button
      class="mx-2 w-6 rounded-md border hover:bg-slate-700"
      :class="{ 'border-2': pages.length - 1 === current_page }"
      @click="navigateToPage(pages.length - 1)"
    >
      >|
    </button>
    <!-- <div>...</div>
    <div class="flex flex-row">
      <button
        class="mx-2 w-6 rounded-md border hover:bg-slate-700"
        @click="navigateToPage(props.pages.length)"
      >
        {{ props.pages.length }}
      </button>
    </div> -->
  </div>
</template>
