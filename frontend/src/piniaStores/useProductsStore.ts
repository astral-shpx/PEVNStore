import { defineStore } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, reactive, watch } from "vue";
import axios from "axios";
import { Product as ProductItem } from "../types/product";
import useToasterStore from "../piniaStores/useToasterStore";
import { store } from "../store";

export default defineStore("products-store", () => {
  const route = useRoute();
  const router = useRouter();
  const toasterStore = useToasterStore();

  const page = ref(1);
  // Ensure page is updated when route query changes
  watch(
    () => route.query.page,
    (newPage) => {
      page.value = newPage ? Number(newPage) : 1;
    }
  );

  const filters = reactive({ fromDate: "", toDate: "" });

  const load_amount = ref(12);

  const total_products_amount = ref(0);
  const pages_to_show = computed(() => {
    const toShow = 7;
    const midPoint = Math.ceil(toShow / 2);

    let begin;
    let end;
    if (page.value < midPoint) {
      begin = 0;
      end = toShow;
    } else if (page.value > total_pages.value - midPoint) {
      begin = total_pages.value - toShow;
      end = total_pages.value;
    } else {
      begin = page.value - midPoint;
      end = page.value + midPoint - 1;
    }

    return pages_array.value.slice(begin, end);
  });
  const loading = ref(true);
  const products = ref<ProductItem[]>([]);
  const total_pages = computed(() => {
    return Math.ceil(total_products_amount.value / load_amount.value);
  });
  const pages_array = computed(() => {
    return Array.from({ length: total_pages.value }, (_, index) => index + 1);
  });

  const nextPage = async () => {
    if (page.value < total_pages.value) {
      navigateToPage(page.value + 1);
    } else {
      toasterStore.error({ text: "No more pages to load." });
    }
  };

  const previousPage = async () => {
    if (page.value > 1) {
      navigateToPage(page.value - 1);
    } else {
      toasterStore.error({ text: "No more pages to navigate back to." });
    }
  };

  const navigateToPage = async (new_page: number) => {
    const direction = Math.sign(new_page - page.value);
    console.log("direction", direction);

    page.value = new_page;
    await fetchProducts();
  };

  // todo add backend functionality to get with filter
  const fetchProducts = async (category = "") => {
    loading.value = true;
    try {
      // console.log(filters.fromDate);

      const resp = await axios.get("/api/products", {
        params: {
          limit: load_amount.value,
          productName: store.searchQuery,
          offset: (page.value - 1) * load_amount.value,
          category: category,
        },
      });
      products.value = resp.data.products;
      total_products_amount.value = resp.data.count;
      router.push({ query: { page: page.value } });
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      loading.value = false;
    }
  };

  return {
    page,
    load_amount,
    total_pages,
    pages_array,
    total_products_amount,
    products,
    loading,
    pages_to_show,
    filters,
    navigateToPage,
    fetchProducts,
    nextPage,
    previousPage,
  };
});
