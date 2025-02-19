import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    isDialogVisible: false,
  }),
  getters: {
    totalPrice(state) {
      return state.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.cart.find((item) => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    deleteProduct(product) {
      const index = this.cart.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          this.cart.splice(index, 1);
        }
      }
    },
    clearCart() {
      this.cart = [];
    },
    toggleCartDialog() {
      this.isDialogVisible = !this.isDialogVisible;
    },
  },
});
