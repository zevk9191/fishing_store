<template>
  <v-container class="text-center">
    <v-card class="mx-auto pa-5" max-width="600">
      <v-card-title>Додати новий товар</v-card-title>
      <v-form @submit.prevent="submitForm">
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
        <v-btn type="submit" color="success">Додати товар</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "AddProduct",
  setup() {
    const productName = ref("");
    const productPrice = ref(null);
    const productCategory = ref(null);
    const productImage = ref("");
    const categories = ref([]);
    const router = useRouter();

    // Завантаження категорій при завантаженні компонента
    onMounted(async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        categories.value = response.data;
      } catch (error) {
        console.error("Помилка отримання категорій:", error);
      }
    });

    // Надсилання форми
    const submitForm = async () => {
      if (
        !productCategory.value ||
        !productName.value ||
        !productPrice.value ||
        !productImage.value
      ) {
        alert("Будь ласка, заповніть всі поля!");
        return;
      }

      const productData = {
        name: productName.value,
        price: productPrice.value,
        category_id: Number(productCategory.value),
        image_url: productImage.value,
      };

      try {
        const token = localStorage.getItem("token"); // Отримуємо токен з localStorage
        await axios.post("http://localhost:3000/api/products", productData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Додаємо токен
          },
        });

        alert("Товар успішно додано!");
        router.push("/admin");
      } catch (error) {
        console.error("Помилка додавання товару:", error);
        alert(
          "Не вдалося додати товар. Переконайтесь, що ви авторизовані як адміністратор."
        );
      }
    };

    return {
      productName,
      productPrice,
      productCategory,
      productImage,
      categories,
      submitForm,
    };
  },
};
</script>

<style scoped>
.v-card-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.v-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.v-btn {
  align-self: center;
}
</style>
