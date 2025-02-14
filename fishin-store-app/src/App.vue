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
      isCartOpen: true,
    };
  },
  methods: {
    toggleCart() {
      this.isCartOpen = !this.isCartOpen; // Перемикаємо стан кошика
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

</style>