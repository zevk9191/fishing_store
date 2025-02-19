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
        @category-selected="selectedCategory = $event"
        @search-changed="searchQuery = $event"
      />
      <Main
        :selectedCategory="selectedCategory"
        :search-query="searchQuery"
        v-if="$route.path === '/'"
      />
      <router-view v-else />
    </v-main>

    <Cart />
    <Footer class="footer-fixed" />
  </v-app>
</template>

<script>
import Header from "./components/Header.vue";
import Main from "./components/Main.vue";
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import Cart from "./components/Cart.vue";

export default {
  name: "App",
  components: {
    Header,
    Main,
    Cart,
    Navigation,
    Footer,
  },
  data() {
    return {
      drawer: false,
      selectedCategory: null,
      searchQuery: "",
    };
  },
  methods: {},
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
