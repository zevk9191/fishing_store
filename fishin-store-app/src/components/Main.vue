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
    <div class="product-section">
      <v-container>
        <v-row>
          <!-- Цикл по масиву товарів -->
          <v-col
            v-for="(product, index) in products"
            :key="index"
            cols="19" sm="6" md="2" lg="2"
          >
            <v-card>
              <!-- Фото товару -->
              <v-img
                :src="product.image"
                height="200px"
                alt="Product Image"
              ></v-img>

              <v-card-title>
                <span class="headline">{{ product.name }}</span>
              </v-card-title>

              <v-card-subtitle>
                <span class="subheading">{{ product.price }} грн</span>
              </v-card-subtitle>

              <v-card-actions class="btn-cart">
                <v-btn color="primary" @click="addToCart(product)" >
                  <v-icon>mdi-cart-plus</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="slider-section"></div>
  </div>

  <!-- Діалогове вікно для кошика -->
  <v-dialog v-model="isDialogVisible" temporary max-width="500px">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          Кошик
          <v-btn icon @click="clearCart">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list >
            <div v-for="(item, index) in cart" :key="index" class="products-in-cart">
              <v-list-item>
                {{ item.name }} - {{ item.price }} грн × {{ item.quantity }}
                <v-btn icon @click="deleteProduct(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item>
            </div>
          </v-list>
          <v-divider></v-divider>
          <p class="text-right font-weight-bold mt-3">Загальна сума: {{ totalPrice }} грн</p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="$emit('update-cart-dialog', false)">Закрити</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'MainSite',
  props: {
    cartDialog: Boolean,
  },
  data: () => ({
    items: [
      { title: 'Ціна за зростанням' },
      { title: 'Ціна за спаданням' },
    ],

    originalProducts: [
      {
        id: 1,
        name: 'Товар 1',
        price: 100,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 2,
        name: 'Товар 2',
        price: 250,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 3,
        name: 'Товар 3',
        price: 300,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 4,
        name: 'Товар 4',
        price: 600,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 5,
        name: 'Товар 5',
        price: 250,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 6,
        name: 'Товар 6',
        price: 350,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 7,
        name: 'Товар 7',
        price: 550,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        id: 8,
        name: 'Товар 8',
        price: 450,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
    ],
    products: [],
    cart: [],
  }),

  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    isDialogVisible: {
      get() {
        return this.cartDialog;
      },
      set(value) {
        this.$emit('update-cart-dialog', value);
      },
    },
  },

  mounted() {
    // Ініціалізуємо products початковими даними
    this.products = [...this.originalProducts];
  },

  methods: {
    sortProducts(index) {
      if (index === 0) {
        // Сортування за зростанням ціни
        this.products.sort((a, b) => a.price - b.price);
      } else if (index === 1) {
        // Сортування за спаданням ціни
        this.products.sort((a, b) => b.price - a.price);
      }
    },
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id);

      if (existingProduct) {
        // Якщо є, збільшуємо кількість
        existingProduct.quantity++;
      } else {
        // Якщо немає, додаємо новий товар із quantity = 1
        this.cart.push({ ...product, quantity: 1 });
      }
    },
    clearCart() {
      this.cart = [];
    },
    deleteProduct(product) {
      const index = this.cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        if (this.cart[index].quantity > 1) {
          this.cart[index].quantity--;
        } else {
          // Якщо кількість дорівнює 1, видаляємо товар із кошика
          this.cart.splice(index, 1);
        }
      }
    },
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

/* .v-btn {
  width: 100%;
} */
.btn-cart {
  display: flex;
  justify-content: end;
}

.products-in-cart {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
