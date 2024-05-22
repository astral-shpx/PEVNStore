import { defineStore } from "pinia";
import { computed } from "vue";
import axios from "axios";
import useToasterStore from "./useToasterStore";

export default defineStore("cart-store", () => {
  const toasterStore = useToasterStore();
  const cart = computed(() => {
    return axios.get("/api/cart");
  });
  const addToCart = async (productId: number) => {
    try {
      const resp = await axios.post("/api/cart", {
        product_id: productId,
        quantity: 1,
      });
      console.log("successful add to cart:", resp.data);
      toasterStore.success({ text: "Successfully added prodcut to cart" });
    } catch (error: any) {
      toasterStore.error({
        text: `Failed to add to cart: ${error.response.data.message}`,
      });
      console.error("Failed to add to cart:", error);
    }
  };
  return {
    cart,
    addToCart,
  };
});
