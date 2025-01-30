<template>
  <v-list>
    <v-list-item>
      
      <v-list-item-content>
        <v-row align="center" justify="start">
          <v-img
            src="@/assets/images/PUBALKA.svg"
            alt="Pubalka Logo"
            max-width= 100px
          ></v-img>
          <v-list-item-title class="ml-2 font-weight-bold">PUBALKA</v-list-item-title>
        </v-row>
      </v-list-item-content>
    </v-list-item>
    
    <v-spacer></v-spacer>

    <v-list-item v-for="category in categories" :key="category.text">
      <v-list-item-title align="center" ><v-btn variant="text" rounded="lg" width="200px">{{ category.text }}</v-btn></v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'NavigationSite',
  data() {
    return {
      categories: [
        { text: 'Спінінги' },
        { text: 'Котушки' },
        { text: 'Приманки' },
        { text: 'Аксесуари' },
        { text: 'Гачки' },
      ],
    };
  },
};
</script>

  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  /* Стиль для логотипу та назви */
.v-list-item-content {
  display: flex;
  align-items: center;
}

.v-list-item-title {
  font-size: 20px; /* Розмір шрифту для назви */
}

.ml-2 {
  margin-left: 8px;
}
  </style>
  