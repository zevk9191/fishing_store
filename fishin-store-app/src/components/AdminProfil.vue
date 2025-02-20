<template>
    <v-container class="text-center">
      <v-card class="mx-auto pa-5" max-width="400">
        <v-card-title>Адмін Панель</v-card-title>
        <v-card-subtitle>Ваша роль: {{ userRole }}</v-card-subtitle>
        <v-card-text>
          <v-btn v-if="isAdmin" color="success" @click="goToAddProduct">Додати новий товар</v-btn>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { useAuthStore } from "@/store/useAuthStore";
  import { computed } from "vue";
  
  export default {
    setup() {
      const authStore = useAuthStore();
      const userRole = computed(() => authStore.userRole);
      const isAdmin = computed(() => authStore.userRole === 'Admin');
  
      const goToAddProduct = () => {
        this.$router.push("/add-product");
      };
  
      return { userRole, isAdmin, goToAddProduct };
    },
  };
  </script>
  
  <style scoped>
  </style>