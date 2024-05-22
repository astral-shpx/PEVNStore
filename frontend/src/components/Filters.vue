<script setup lang="ts">
import { ref } from "vue";
import useFiltersStore from "../piniaStores/useFiltersStore";
import { storeToRefs } from "pinia";

const filtersStore = useFiltersStore();

const { filters } = storeToRefs(filtersStore);

const rating = ref(3);
const ratingMin = ref(0);
const ratingMax = ref(5);
const sortBy = ref("reviews_asc");
const loadAmount = ref(10);
const loadAmounts = ref([12, 24, 30]);

const updateFromDate = (event: Event) => {
  filters.value.fromDate = (event.target as HTMLInputElement).value;
};

const updateToDate = (event: Event) => {
  filters.value.toDate = (event.target as HTMLInputElement).value;
};

const clearFilters = () => {
  filtersStore.reset();
};
</script>

<template>
  <div class="bg-white dark:bg-slate-700 w-full mb-3 p-2 rounded-md">
    <h4 @click="clearFilters" class="mb-2 underline cursor-pointer">
      Clear filters
    </h4>

    <div class="mb-4">
      <h3 class="mb-2">Release date</h3>
      <label for="fromDate" class="bg-white dark:bg-slate-700"> From </label>
      <input
        class="text-slate-800"
        type="date"
        name="toDate"
        id=""
        v-model="filters.fromDate"
        @input="updateFromDate"
      />
      <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
      <input
        class="text-slate-800"
        type="date"
        name="fromDate"
        id=""
        v-model="filters.toDate"
        @input="updateToDate"
      />
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Price</h3>
      <div class="flex flex-col">
        <label
          v-for="priceRange in filtersStore.priceRanges"
          :key="priceRange.label"
        >
          <input
            type="checkbox"
            v-model="filtersStore.selectedPriceRanges"
            :value="priceRange"
          />
          {{ priceRange.label }}
        </label>
      </div>
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Rating above</h3>
      <input
        type="range"
        v-model="rating"
        :min="ratingMin"
        :max="ratingMax"
        step="0.1"
      />
      <p>{{ rating }}</p>
    </div>

    <div class="flex flex-col">
      <h3 class="mb-2">Category</h3>
      <!-- category dropdown -->
    </div>

    <!-- sort by reviews[dropdown] asc / desc -->
    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Sort by</h3>
      <label>
        <input type="radio" />
        Ascending
      </label>
      <label>
        <input type="radio" />
        Descending
      </label>
      <select class="dark:text-slate-900" v-model="sortBy">
        <option class="mx-2" value="reviews_asc">Reviews (Asc)</option>
        <option class="mx-2" value="reviews_desc">Reviews (Desc)</option>
      </select>
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Load amount</h3>
      <div>
        <label v-for="amount in loadAmounts" :key="amount">
          <input
            class="mx-1"
            type="radio"
            v-model="loadAmount"
            :value="amount"
          />
          {{ amount }}
        </label>
      </div>
    </div>
  </div>
</template>
