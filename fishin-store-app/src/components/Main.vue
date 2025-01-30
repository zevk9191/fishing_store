<template>
  <div class="filter-section">
    <v-btn  variant="text">
      Filter
      <v-icon icon="mdi-filter"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>
<div class="product-section"></div>
<div class="slider-section"></div>
  </template>
  
  <script>
  export default {
    name: 'MainSite',
    data: () => ({
      items: [
        { title: 'Ціна за зростанням' },
        { title: 'Ціна за спаданням' },
      ],
    }),
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .filter-section {
  position: fixed; /* Зафіксувати елемент */
  top: 60px; /* Відстань від верхньої частини (залежно від висоти header) */
  right: 20px; /* Відстань від правого краю */
  z-index: 1000; /* Задайте вищий пріоритет, щоб кнопка була поверх інших елементів */
}

.product-section {
  margin-top: 100px; 
}
  </style>
  