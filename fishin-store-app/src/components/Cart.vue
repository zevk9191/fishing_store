<template>
  <v-dialog v-model="cartStore.isDialogVisible" temporary max-width="500px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        Кошик
        <v-btn icon @click="cartStore.clearCart()">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-list>
          <div
            v-for="(item, index) in cart"
            :key="index"
            class="products-in-cart"
          >
            <v-list-item>
              {{ item.name }} - {{ item.price }} грн × {{ item.quantity }}
              <v-btn icon @click="cartStore.deleteProduct(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-list-item>
          </div>
        </v-list>
        <v-divider></v-divider>
        <p class="text-right font-weight-bold mt-3">
          Загальна сума: {{ totalPrice }} грн
        </p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="cartStore.toggleCartDialog()"
          >Закрити</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useCartStore } from "@/store/cartStore";
export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  name: "OpenCart",
  computed: {
    cart() {
      return this.cartStore.cart;
    },
    totalPrice() {
      return this.cartStore.totalPrice;
    },
  },
};
</script>

<style scoped>
.products-in-cart {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
