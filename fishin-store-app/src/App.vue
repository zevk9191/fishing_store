<template>
  <v-app>
    <v-main>
      <Header msg="dsds Lox" />
      <Main msg="sdsdds Lox" />
      <Navigation msg="Nazsdsdik Lox" />
      <Footer msg="Nazsdsdik Lox" />
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
