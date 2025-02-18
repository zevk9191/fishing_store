<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <Navigation
        @category-selected="selectedCategory = $event"
        @close-menu="drawer = false"
      />
    </v-navigation-drawer>

    <v-main>
      <Header
        @toggle-navigation="drawer = !drawer"
        @open-cart="toggleCart"
        @category-selected="selectedCategory = $event"
        @search-changed="searchQuery = $event"
      />
      <Main
        :cart-dialog="cartDialog"
        :selectedCategory="selectedCategory"
        :search-query="searchQuery"
        @update-cart-dialog="toggleCart"
        v-if="$route.path === '/'"
      />
      <router-view v-else />
    </v-main>

    <Footer class="footer-fixed" />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
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
      selectedCategory: null,
      searchQuery: "",
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
}

.footer-fixed {
  position: static;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa;
  z-index: 1000;
  height: 40px;
}
</style>
