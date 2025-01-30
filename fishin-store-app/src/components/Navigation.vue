<template>
  <v-list>
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
  
  </style>
  