<template>
  <v-container class="text-center">
    <v-card class="profile-card mx-auto pa-5">
      <v-card-title>Профіль користувача</v-card-title>
      <v-card-subtitle>Ваша роль: {{ userRole }}</v-card-subtitle>

      <v-card-text>
        <v-list dense class="user-info">
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon">mdi-account</v-icon>
              <strong>Ім'я:</strong>
              <span>{{ user.first_name }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon">mdi-card-account-details</v-icon>
              <strong>Прізвище:</strong>
              <span>{{ user.last_name }}</span>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="list-item">
              <v-icon class="icon">mdi-phone</v-icon>
              <strong>Телефон:</strong>
              <span>{{ user.phone_number }}</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="editProfile">Редагувати</v-btn>
        <v-btn
          v-if="userRole === 'Admin'"
          class="success-btn"
          @click="isAddingProduct = true"
        >
          Додати товар
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- Діалог редагування профілю -->
    <v-dialog v-model="isEditing" max-width="400px">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">Редагувати профіль</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="editedUser.first_name"
            label="Ім'я"
          ></v-text-field>
          <v-text-field
            v-model="editedUser.last_name"
            label="Прізвище"
          ></v-text-field>
          <v-text-field
            v-model="editedUser.phone_number"
            label="Телефон"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn class="cancel-btn" @click="isEditing = false">Скасувати</v-btn>
          <v-btn class="success-btn" @click="saveChanges">Зберегти</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Діалог додавання товару -->
    <v-dialog v-model="isAddingProduct" max-width="500px">
      <v-card class="dialog-card">
        <v-card-title class="dialog-title">Додати новий товар</v-card-title>
        <v-form @submit.prevent="submitForm">
          <v-card-text>
            <v-autocomplete
              v-model="productCategory"
              :items="categories"
              item-title="name"
              item-value="id"
              label="Категорія товару"
              clearable
              required
            ></v-autocomplete>
            <v-text-field
              v-model="productName"
              label="Назва товару"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="productPrice"
              label="Ціна товару"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model="productImage"
              label="URL зображення товару"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn class="cancel-btn" @click="isAddingProduct = false"
              >Скасувати</v-btn
            >
            <v-btn class="success-btn" type="submit">Додати товар</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

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
    const user = ref({
      first_name: "",
      last_name: "",
      phone_number: "",
    });

    const isEditing = ref(false);
    const isAddingProduct = ref(false);
    const editedUser = ref({});
    const snackbar = ref({ show: false, message: "", color: "success" });

    // Дані для товару
    const productName = ref("");
    const productPrice = ref(null);
    const productCategory = ref(null);
    const productImage = ref("");
    const categories = ref([]);

    onMounted(async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        user.value = response.data;

        // Завантаження категорій
        const categoriesResponse = await axios.get(
          "http://localhost:3000/api/categories"
        );
        categories.value = categoriesResponse.data;
      } catch (error) {
        console.error(
          "Помилка отримання даних користувача або категорій:",
          error
        );
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

    const submitForm = async () => {
      if (
        !productCategory.value ||
        !productName.value ||
        !productPrice.value ||
        !productImage.value
      ) {
        showSnackbar("⚠️ Будь ласка, заповніть всі поля!", "warning");
        return;
      }

      const productData = {
        name: productName.value,
        price: productPrice.value,
        category_id: Number(productCategory.value),
        image_url: productImage.value,
      };

      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:3000/api/products", productData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        isAddingProduct.value = false;
        showSnackbar("Товар успішно додано!", "success");
      } catch (error) {
        console.error("Помилка додавання товару:", error);
        showSnackbar("Не вдалося додати товар.", "error");
      }
    };

    return {
      user,
      userRole,
      isEditing,
      editedUser,
      editProfile,
      saveChanges,
      isAddingProduct,
      productName,
      productPrice,
      productCategory,
      productImage,
      categories,
      submitForm,
      snackbar,
    };
  },
};
</script>

<style scoped>
.profile-card {
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 10px 0;
}

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
}

.icon {
  font-size: 22px;
  color: #3f51b5;
}

.v-card-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.dialog-card {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.dialog-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.success-btn {
  background-color: #4caf50 !important;
  color: white !important;
}

.cancel-btn {
  background-color: #f44336 !important;
  color: white !important;
}
</style>
