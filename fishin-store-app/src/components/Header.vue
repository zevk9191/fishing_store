<template>
  <v-card
    color="grey-lighten-4"
    height="200px"
    rounded="0"
    flat
  >
    <v-toolbar density="compact">

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      
      <!-- Кнопка з логотипом -->
      <v-btn
        :style="{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '50px',
          height: '50px',
        }"
        @click="onClick"
      ></v-btn>

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
import PubalkaLogo from '@/assets/images/PUBALKA.png'; // Імпорт логотипу

export default {
  name: 'HeaderSite',
  data() {
    return {
      logo: PubalkaLogo, // Збереження шляху до логотипу
    };
  },
  methods: {
    onClick() {
      console.log('Логотип натиснуто');
    },
  },
};
</script>


<style scoped>
/* .logo-btn {
  background-image: url('VS-Fishin-store/fishin-store-app/fishing_store/fishin-store-app/src/assets/images/PUBALKA.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px; 
  height: 50px; 
  padding: 0; 
  border: none; 
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
} */
</style>
