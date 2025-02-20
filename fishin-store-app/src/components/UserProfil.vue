<template>
  <v-container class="text-center">
    <v-card class="mx-auto pa-5 profile-card">
      <v-card-title class="title">Профіль користувача</v-card-title>

      <v-card-text>
        <v-list dense class="user-info">
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon" color="primary">mdi-account</v-icon>
              <strong>Ім'я:</strong>
              <span>{{ user.first_name }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon" color="primary"
                >mdi-card-account-details</v-icon
              >
              <strong>Прізвище:</strong>
              <span>{{ user.last_name }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon" color="primary">mdi-phone</v-icon>
              <strong>Телефон:</strong>
              <span>{{ user.phone_number }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions class="actions">
        <v-btn color="primary" @click="editProfile" variant="elevated">
          <v-icon left>mdi-pencil</v-icon> Редагувати
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Діалог редагування профілю -->
    <v-dialog v-model="isEditing" max-width="400px">
      <v-card class="edit-card">
        <v-card-title class="title">Редагувати профіль</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedUser.first_name"
            label="Ім'я"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="editedUser.last_name"
            label="Прізвище"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="editedUser.phone_number"
            label="Телефон"
            outlined
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="actions">
          <v-btn color="red" text @click="isEditing = false">
            <v-icon left>mdi-close</v-icon> Скасувати
          </v-btn>
          <v-btn color="green" @click="saveChanges">
            <v-icon left>mdi-content-save</v-icon> Зберегти
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Сповіщення -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      timeout="3000"
      location="top"
    >
      {{ snackbar.message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export default {
  setup() {
    const authStore = useAuthStore();
    const userRole = computed(() => authStore.userRole);
    const user = ref({ first_name: "", last_name: "", phone_number: "" });
    const isEditing = ref(false);
    const editedUser = ref({});
    const snackbar = ref({ show: false, message: "", color: "success" });

    onMounted(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        user.value = response.data;
      } catch (error) {
        console.error("Помилка отримання даних користувача:", error);
      }
    });

    const editProfile = () => {
      editedUser.value = { ...user.value };
      isEditing.value = true;
    };

    const saveChanges = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://localhost:3000/api/user",
          {
            firstName: editedUser.value.first_name,
            lastName: editedUser.value.last_name,
            phone: editedUser.value.phone_number,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        user.value = { ...editedUser.value };
        isEditing.value = false;
        showSnackbar("Дані оновлено!", "success");
      } catch (error) {
        console.error("Помилка оновлення профілю:", error);
        showSnackbar("Не вдалося оновити дані.", "error");
      }
    };

    const showSnackbar = (message, color) => {
      snackbar.value = { show: true, message, color };
    };

    return {
      user,
      userRole,
      isEditing,
      editedUser,
      editProfile,
      saveChanges,
      snackbar,
    };
  },
};
</script>

<style scoped>
.profile-card {
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
}

.title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
}

.list-item strong {
  margin-bottom: 4px;
}

.icon {
  margin-right: 12px;
}

.actions {
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
}

.edit-card {
  padding: 10px;
  border-radius: 12px;
}
</style>
