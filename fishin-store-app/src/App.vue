<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <Navigation />
    </v-navigation-drawer>

    <v-main>
      <Header @toggle-navigation="drawer = !drawer" @open-cart="cartDialog = true" />
      <Main @add-to-cart="addToCart" />
      <Footer />
    </v-main>

    <!-- Діалогове вікно для кошика -->
    <v-dialog v-model="cartDialog" max-width="500px">
      <v-card>
        <v-card-title>Кошик</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list>
            <v-list-item v-for="(item, index) in cart" :key="index">
              <v-list-item-title>{{ item.name }} - {{ item.price }} грн</v-list-item-title>
            </v-list-item>
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
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
  },
};
</script>