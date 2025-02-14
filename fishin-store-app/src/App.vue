<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <Navigation />
    </v-navigation-drawer>

    <v-main>
      <Header @toggle-navigation="drawer = !drawer" @open-cart="toggleCart" />
      <Main 
        :cart-dialog="cartDialog" 
        @update-cart-dialog="toggleCart" 

        v-if="$route.path === '/'"
      />

      <router-view v-else />

      
    </v-main>

    <Footer class="footer-fixed" />

    
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
    };
  },
  methods: {
    toggleCart() {
      this.cartDialog = !this.cartDialog;
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