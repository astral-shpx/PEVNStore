<script setup lang="ts">
import { ref } from "vue";
import useFiltersStore from "../piniaStores/useFiltersStore";
import { storeToRefs } from "pinia";

const filtersStore = useFiltersStore();

const { filters } = storeToRefs(filtersStore);

const rating = ref(filters.value.ratingAbove);
const ratingMin = ref(0);
const ratingMax = ref(5);

const updateFromDate = (event: Event) => {
  filters.value.fromDate = (event.target as HTMLInputElement).value;
};

const updateToDate = (event: Event) => {
  filters.value.toDate = (event.target as HTMLInputElement).value;
};

const updateRangeAbove = () => {
  filters.value.ratingAbove = rating.value;
};

const clearFilters = () => {
  filtersStore.reset();
  filtersStore.selectedPriceRanges = [];
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
        class="text-slate-800 rounded-sm"
        type="date"
        name="toDate"
        v-model="filters.fromDate"
        @input="updateFromDate"
      />
      <label for="toDate" class="bg-white dark:bg-slate-700"> To </label>
      <input
        class="text-slate-800 rounded-sm"
        type="date"
        name="fromDate"
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
        @mouseup="updateRangeAbove"
        @touchend="updateRangeAbove"
        v-model="rating"
        :min="ratingMin"
        :max="ratingMax"
        step="0.1"
      />
      <p>{{ rating }}</p>
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Category</h3>
      <select
        class="dark:text-slate-900 rounded-sm"
        v-model="filtersStore.category"
      >
        <option value="">All</option>
        <option
          class="mx-2"
          :value="catg"
          v-for="catg in filtersStore.categories"
        >
          {{ catg }}
        </option>
      </select>
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Order by</h3>
      <select
        class="dark:text-slate-900 rounded-sm"
        v-model="filtersStore.orderBy"
      >
        <option value="">Default</option>
        <option
          class="mx-2"
          :value="orderByOpt"
          v-for="orderByOpt in filtersStore.orderByOptions"
        >
          {{
            orderByOpt.charAt(0).toUpperCase() +
            orderByOpt.replace("_", " ").slice(1)
          }}
        </option>
      </select>
      <label>
        <input
          type="radio"
          name="order"
          value="ASC"
          checked
          v-model="filtersStore.orderDirection"
        />
        Ascending
      </label>
      <label>
        <input
          type="radio"
          name="order"
          value="DESC"
          v-model="filtersStore.orderDirection"
        />
        Descending
      </label>
    </div>

    <div class="flex flex-col mb-4">
      <h3 class="mb-2">Load amount</h3>
      <div>
        <label v-for="amount in filtersStore.loadAmounts" :key="amount">
          <input
            class="mx-1"
            type="radio"
            v-model="filtersStore.loadAmount"
            :value="amount"
            :checked="filtersStore.loadAmount === amount"
          />
          {{ amount }}
        </label>
      </div>
    </div>
  </div>
</template>
