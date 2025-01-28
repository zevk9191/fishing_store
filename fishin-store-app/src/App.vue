<template>
  <v-app>
    <v-main>
      <Header />
      <Main msg="main" />
      <Navigation msg="Navigation" />
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

  data: () => ({
    //
  }),
}
</script>x
