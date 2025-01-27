<template>
  <v-card
    color="grey-lighten-4"
    height="200px"
    rounded="0"
    flat
  >
    <v-toolbar density="compact">

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-btn class="logo-btn" @click="onClick"></v-btn>

      <v-toolbar-title>PUBALKA</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>

export default {
  name: 'HeaderSite', 
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.logo-btn {
  background-image: url('/P32/Fishing_store/fishing_store/fishin-store-app/src/assets/images/PUBALKA.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px; /* Розмір кнопки */
  height: 50px; /* Розмір кнопки */
  padding: 0; /* Прибираємо відступи */
  border: none; /* Прибираємо бордери */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
