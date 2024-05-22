import { defineStore } from "pinia";
import { watch, ref, toRaw, reactive } from "vue";
import useProductStore from "../piniaStores/useProductsStore";
import { useRoute } from "vue-router";

interface IFilters {
  fromDate: string;
  toDate: string;
  minPrice: number;
  maxPrice: number;
}

interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export default defineStore("filters-store", () => {
  const productsStore = useProductStore();
  const route = useRoute();
  //   const { fetchProducts } = productsStore;

  const filters = reactive<IFilters>({
    fromDate: "",
    toDate: "",
    minPrice: 0,
    maxPrice: Number.POSITIVE_INFINITY,
  });
  watch(
    () => route.query.filters,
    (newFilters) => {
      try {
        let f: IFilters = newFilters as unknown as IFilters;
        console.log(f);
        filters.fromDate = f.fromDate;
        filters.toDate = f.toDate;
        filters.minPrice = f.minPrice;
        filters.maxPrice = f.maxPrice;
      } catch (error) {
        console.error("error setting filters", error);
      }
    }
  );

  const priceRanges = ref<PriceRange[]>([
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$51 - $100", min: 51, max: 100 },
    { label: "$101 - $200", min: 101, max: 200 },
    { label: "$201 - $500", min: 201, max: 500 },
    { label: "$501 - $1000", min: 501, max: 1000 },
    { label: "above $1000", min: 1001, max: Number.POSITIVE_INFINITY },
  ]);
  const selectedPriceRanges = ref<PriceRange[]>([]);

  const reset = () => {
    filters.fromDate = "";
    filters.toDate = "";
  };

  watch(filters, async () => {
    await productsStore.fetchProducts();
  });
  watch(selectedPriceRanges, async () => {
    const rawRanges = toRaw(selectedPriceRanges.value) as PriceRange[];

    const largestMaxValue = rawRanges.reduce<number>((max, currentRange) => {
      return currentRange.max > max ? currentRange.max : max;
    }, 0);

    const smallestMinValue = rawRanges.reduce<number>((min, currentRange) => {
      return currentRange.min < min ? currentRange.min : min;
    }, Number.POSITIVE_INFINITY);

    console.log("Smallest min value:", smallestMinValue);
    console.log("Largest max value:", largestMaxValue);

    filters.minPrice = smallestMinValue;
    filters.maxPrice = largestMaxValue;

    await productsStore.fetchProducts();
  });
  return {
    filters,
    reset,
  };
});
