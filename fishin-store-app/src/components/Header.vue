<template>
  <v-card
    color="grey-lighten-4"
    height="50px"
    rounded="0"
    flat
  >
    <v-toolbar density="compact">
      <v-app-bar-nav-icon @click="$emit('toggle-navigation')"></v-app-bar-nav-icon>

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

      <!-- Умовне відображення панелі пошуку -->
      <v-text-field
        v-if="showSearch"
        v-model="searchQuery"
        placeholder="Пошук..."
        variant="outlined"
        density="compact"
        clearable
        hide-details
        class="search-field"
        @blur="closeSearch" 
      ></v-text-field>

      <!-- Кнопка пошуку -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon="mdi-shopping">
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
      logo: PubalkaLogo, // Шлях до логотипу
      searchQuery: '', // Змінна для тексту пошуку
      showSearch: false, // Показ чи приховування панелі пошуку
    };
  },
  methods: {
    onClick() {
      console.log('Логотип натиснуто');
    },
    toggleSearch() {
      this.showSearch = !this.showSearch; // Показуємо або приховуємо панель пошуку
    },
    closeSearch() {
      this.showSearch = false; // Закриваємо панель після втрати фокуса
    },
  },
};
</script>

<style scoped>
/* Додаткове стилювання для панелі пошуку */
.search-field {
  max-width: 300px; /* Обмеження ширини поля пошуку */
  margin-right: 8px; /* Відступ між полем пошуку та кнопкою */
}
</style>
