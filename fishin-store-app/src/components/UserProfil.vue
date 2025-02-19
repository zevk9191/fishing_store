<template>
    <v-container class="text-center">
      <v-card class="mx-auto pa-5" max-width="400">
        <v-card-title>Профіль Користувача</v-card-title>
        <v-card-subtitle>Ваша роль: {{ userRole }}</v-card-subtitle>
        <v-card-text>
          <v-btn color="primary" @click="showRole">Показати роль</v-btn>
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
  
      const showRole = () => {
        alert(`Ваша роль: ${userRole.value}`);
      };
  
      return { userRole, showRole };
    },
  };
  </script>

<style scoped>

</style>