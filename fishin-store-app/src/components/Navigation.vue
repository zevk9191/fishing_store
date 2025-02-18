<template>
  <v-list>
    <v-list-item>
      <v-list-item-content>
        <v-row align="center" justify="start">
          <v-img
            src="@/assets/images/PUBALKA.svg"
            alt="Pubalka Logo"
            max-width="100px"
          ></v-img>
          <v-list-item-title class="ml-2 font-weight-bold"
            >Рибалка</v-list-item-title
          >
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <v-spacer></v-spacer>
    <div align="center">
      <v-btn
        variant="text"
        rounded="lg"
        width="200px"
        @click="selectCategory(null)"
        >Усі товари</v-btn
      >
    </div>

    <v-list-item v-for="category in categories" :key="category.id">
      <v-list-item-title align="center">
        <v-btn
          variant="text"
          rounded="lg"
          width="200px"
          @click="selectCategory(category.id)"
          >{{ category.name }}</v-btn
        ></v-list-item-title
      >
    </v-list-item>
  </v-list>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "NavigationSite",
  emits: ["category-selected"],
  setup(_, { emit }) {
    const categories = ref([]);

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/categories"
        );
        categories.value = response.data;
      } catch (error) {
        console.error("Помилка отримання категорій:", error);
      }
    };
    const selectCategory = (categoryId) => {
      emit("category-selected", categoryId);
      emit("close-menu");
    };

    onMounted(fetchCategories);

    return { categories, selectCategory };
  },
};
</script>

<style scoped>
.v-list-item-content {
  display: flex;
  align-items: center;
}

.v-list-item-title {
  font-size: 20px;
}

.ml-2 {
  margin-left: 8px;
}
</style>
