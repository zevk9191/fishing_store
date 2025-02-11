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

              <v-card-actions>
                <v-btn color="primary" @click="$emit('add-to-cart', product)">
                  Додати до кошика
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="slider-section"></div>
  </div>
</template>

<script>
export default {
  name: 'MainSite',
  data: () => ({
    items: [
      { title: 'Ціна за зростанням' },
      { title: 'Ціна за спаданням' },
    ],

    originalProducts: [
      {
        name: 'Товар 1',
        price: 100,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 2',
        price: 250,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 3',
        price: 300,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 4',
        price: 600,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 5',
        price: 250,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 6',
        price: 350,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 7',
        price: 550,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
      {
        name: 'Товар 8',
        price: 450,
        image: 'https://kormak.ua/content/images/43/390x390l80mc0/spininh-teleskopichnyi-reflex-fr-2.40m-20-80hr.-213-2080-24-68482102686956.webp',
      },
    ],
    products: [],
  }),

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
      console.log('Додано до кошика:', product);
    },
  },
};
</script>

<style scoped>
.filter-section {
  padding: 1%;
  display: flex;
  justify-self: end;
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

.v-btn {
  width: 100%;
}
</style>