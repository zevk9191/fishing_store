<template>
  <div class="filter-section">
    <v-btn variant="text">
      Filter
      <v-icon icon="mdi-filter"></v-icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="sortProducts(index)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-btn>
  </div>

  <div class="product-main">
    <v-container class="product-container">
      <v-row>
        <!-- Цикл по масиву товарів -->
        <v-col
          v-for="(product, index) in products"
          :key="index"
          lg="4"
          class="product-item"
        >
          <v-card class="product-card">
            <!-- Фото товару -->
            <v-img
              :src="product.image_url"
              height="200px"
              alt="Product Image"
              class="product-image"
            ></v-img>

            <v-card-title class="product-title">
              <span class="headline">{{ product.name }}</span>
            </v-card-title>

            <v-card-subtitle class="product-price">
              <span class="subheading">Ціна {{ product.price }} грн</span>
            </v-card-subtitle>

            <v-card-actions class="add-to-cart-btn">
              <v-btn color="primary" @click="addToCart(product)">
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="slider">
      <v-btn icon @click="prevPage" :disabled="currentPage === 1">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span class="page-number"> Сторінка {{ currentPage }} </span>
      <v-btn icon @click="nextPage" :disabled="currentPage >= totalPages">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/useAuthStore";

export default {
  name: "MainSite",
  props: {
    selectedCategory: Number,
    searchQuery: String,
  },

  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    return { cartStore, authStore };
  },

  data() {
    return {
      items: [{ title: "Ціна за зростанням" }, { title: "Ціна за спаданням" }],
      products: [],
      currentPage: 1,
      pageSize: 6,
      totalPages: 1,
    };
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(start, start + this.pageSize);
    },
  },

  methods: {
    async fetchProducts() {
      try {
        const params = {
          page: this.currentPage,
          limit: this.pageSize,
          category: this.selectedCategory || null,
        };

        if (this.searchQuery) {
          params.search = this.searchQuery;
        }

        const response = await axios.get(
          `http://localhost:3000/api/${
            this.searchQuery ? "search" : "products"
          }`,
          { params }
        );

        this.products = this.searchQuery
          ? response.data
          : response.data.products;
        this.totalPages = this.searchQuery ? 1 : response.data.totalPages;
      } catch (error) {
        console.error("Помилка при отриманні продуктів:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.fetchProducts();
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchProducts();
      }
    },
    sortProducts(index) {
      if (index === 0) {
        this.products.sort((a, b) => a.price - b.price);
      } else if (index === 1) {
        this.products.sort((a, b) => b.price - a.price);
      }
    },
    addToCart(product) {
      this.cartStore.addToCart(product);
    },
  },

  watch: {
    currentPage() {
      this.fetchProducts();
    },
    selectedCategory() {
      this.currentPage = 1;
      this.fetchProducts();
    },
    searchQuery() {
      this.fetchProducts(); // Викликаємо пошук при зміні пошукового запиту
    },
  },

  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped>
.filter-section {
  padding: 1%;
  display: flex;
  justify-content: end;
  align-items: center;
}

.v-card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.v-card-title {
  font-weight: bold;
}

.v-card-subtitle {
  color: #4caf50; /* Зелений для ціни */
}

.product-item {
  display: flex;
  justify-content: center;
}

.product-card {
  width: 100%;
  min-width: 300px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
  background-color: #f9f9f9;
}

.product-image {
  object-fit: cover;
  border-radius: 4px;
}

.product-title {
  font-weight: bold;
  color: #333;
}

.product-price {
  font-weight: bold;
  font-size: 18px;
  color: #000000;
}

.add-to-cart-btn {
  display: flex;
  justify-content: end;
}

.slider {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  padding: 10px 20px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.slider .v-btn {
  background-color: #1976d2;
  color: white;
  transition: 0.3s ease;
}

.slider .v-btn:disabled {
  background-color: #b0bec5;
}

.slider .v-btn:hover {
  background-color: #1565c0;
}

.page-number {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-container {
  min-height: 45rem;
}
</style>
