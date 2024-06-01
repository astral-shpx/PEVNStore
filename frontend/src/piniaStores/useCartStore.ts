import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";
import useToasterStore from "./useToasterStore";
import { useRoute } from "vue-router";
import { Product } from "../types/product";

interface CartItem {
  product_id: number;
  quantity: number;
}

export default defineStore("cart-store", () => {
  const toasterStore = useToasterStore();
  const route = useRoute();

  const cart = ref<CartItem[]>([]);

  const cartProducts = ref<Product[]>();

  const isEmptyResponse = ref(route.query.empty as unknown as boolean);

  const fetchCartProducts = async () => {
    try {
      const resp = await axios.get("/api/products", {
        params: {
          ids: JSON.stringify(cart.value.map((item) => item.product_id)),
        },
      });
      cartProducts.value = resp.data.products;
    } catch (error: any) {
      console.error("Failed to fetch cart products:", error);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await axios.delete("/api/cart", {
        data: {
          product_id: id,
        },
      });
      cartProducts.value = cartProducts.value?.filter((p) => p.id !== id);
    } catch (error: any) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await axios.post("/api/cart", {
        product_id: productId,
        quantity: 1,
      });
      cart.value = (await axios.get("/api/cart")).data;
      await fetchCartProducts();

      toasterStore.success({ text: "Successfully added prodcut to cart" });
    } catch (error: any) {
      toasterStore.error({
        text: `Failed to add to cart: ${error.response.data.message}`,
      });
      console.error("Failed to add to cart:", error);
    }
  };

  const clearCart = async () => {
    try {
      if (cart.value.length === 0) {
        toasterStore.warning({ text: "Cart is empty" });
        return;
      }

      await axios.delete("/api/cart/clear");
      cart.value = [];
      cartProducts.value = [];

      toasterStore.success({ text: "Cart cleared" });
    } catch (error: any) {
      toasterStore.error({
        text: `Failed to clear cart: ${error.response.data.message}`,
      });
    }
  };

  const updateQty = async (productId: number | undefined, newQty: number) => {
    if (newQty < 1) {
      return;
    }
    if (productId) {
      try {
        await axios.put("/api/cart", {
          product_id: productId,
          quantity: newQty,
        });

        cart.value = (await axios.get("/api/cart")).data;
        await fetchCartProducts();
      } catch (error: any) {
        console.error("Failed to update cart:", error);
      }
    }
  };

  const increaseQty = async (productId: number | undefined) => {
    if (productId) {
      const index = cart.value.findIndex((i) => i.product_id === productId);
      const newQty = cart.value[index].quantity + 1;
      await updateQty(productId, newQty);
    }
  };

  const decreaseQty = async (productId: number | undefined) => {
    if (productId) {
      const index = cart.value.findIndex((i) => i.product_id === productId);
      const newQty = cart.value[index].quantity - 1;
      await updateQty(productId, newQty);
    }
  };

  onMounted(async () => {
    try {
      cart.value = (await axios.get("/api/cart")).data;
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }

    await fetchCartProducts();
  });
  return {
    cart,
    isEmptyResponse,
    cartProducts,
    addToCart,
    clearCart,
    fetchCartProducts,
    removeFromCart,
    increaseQty,
    decreaseQty,
  };
});
