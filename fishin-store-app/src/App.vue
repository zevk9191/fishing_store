<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <Navigation />
    </v-navigation-drawer>

    <v-main>
      <Header @toggle-navigation="drawer = !drawer" @open-cart="cartDialog = true" />
      <Main @add-to-cart="addToCart" />
    </v-main>

    <Footer class="footer-fixed" />

    <!-- Діалогове вікно для кошика -->
    <v-dialog v-model="cartDialog" max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          Кошик
          <v-btn icon @click="clearCart">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list >
            <div v-for="(item, index) in cart" :key="index" class="products-in-cart">
              <v-list-item>
                {{ item.name }} - {{ item.price }} грн × {{ item.quantity }}
                <v-btn icon @click="deleteProduct(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </div>
          </v-list>
          <v-divider></v-divider>
          <p class="text-right font-weight-bold mt-3">Загальна сума: {{ totalPrice }} грн</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="cartDialog = false">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Main from './components/Main.vue';
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Main,
    Navigation,
    Footer,
  },
  data() {
    return {
      drawer: false,
      cartDialog: false,
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  methods: {
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);

      if (existingProduct) {
        // Якщо є, збільшуємо кількість
        existingProduct.quantity++;
      } else {
        // Якщо немає, додаємо новий товар із quantity = 1
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    clearCart() {
      this.cart = [];
    },
    deleteProduct(product) {
      const index = this.cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          // Якщо кількість дорівнює 1, видаляємо товар із кошика
          this.cart.splice(index, 1);
        }
      }
    },
  },
};
</script>

<style scoped>
.v-app {
  display: flex;
  flex-direction: footer;
  min-height: 100vh;
}

.v-main {
  flex-grow: 1;
  padding-bottom: 60px;
  /* Висота футера */
}

.footer-fixed {
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  z-index: 1000;
  height: 40px;
  /* Фіксована висота футера */
}

.products-in-cart {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>