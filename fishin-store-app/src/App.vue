<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary>
      <Navigation />
    </v-navigation-drawer>

    <v-main>
      <Header @toggle-navigation="drawer = !drawer" />
      <Main msg="main" />
      <Footer />
    </v-main>
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
    };
  },
};
</script>
