<template>
  <v-card
    color="grey-lighten-4"
    height="200px"
    rounded="0"
    flat
  >
    <v-toolbar density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-img
        :src="logo"
        alt="PUBALKA logo"
        max-width="50"
        class="mr-2"
      />

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
import PubalkaLogo from '/P32/Fishing_store/fishing_store/fishin-store-app/src/assets/images/PUBALKA.svg';

export default {
  name: 'HeaderSite', 
  data() {
    return {
      logo: PubalkaLogo,
    };
  },
};
</script>

<style scoped>

</style>
