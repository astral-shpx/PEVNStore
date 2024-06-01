import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";
import useToasterStore from "./useToasterStore";
import { Product } from "../types/product";

interface Favourite {
  id: number;
  product: Product;
}

export default defineStore("favourites-store", () => {
  const toasterStore = useToasterStore();

  const favourites = ref<Favourite[]>([]);

  const addToFavourites = async (productId: number) => {
    try {
      await axios.post("/api/favourites", {
        product_id: productId,
      });

      await fetchFavourites();

      toasterStore.success({ text: "Added prodcut to favourites" });
    } catch (error: any) {
      toasterStore.error({
        text: `Failed to add to favourites: ${error.response.data.message}`,
      });
      console.error("Failed to add to favourites:", error);
    }
  };

  const removeFavourite = async (productId: number) => {
    try {
      await axios.delete("/api/favourites", {
        data: {
          product_id: productId,
        },
      });

      await fetchFavourites();
    } catch (error: any) {
      toasterStore.error({
        text: `Failed to remove favourite: ${error.response.data.message}`,
      });
      console.error("Failed to remove favourite:", error);
    }
  };

  const fetchFavourites = async () => {
    try {
      const resp = await axios.get("/api/favourites");

      favourites.value = resp.data;
    } catch (error: any) {
      console.error("Failed to fetch favourites:", error);
    }
  };

  onMounted(async () => {
    await fetchFavourites();
  });

  return {
    favourites,
    removeFavourite,
    addToFavourites,
  };
});
