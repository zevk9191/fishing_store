<template>
  <v-card color="grey-lighten-4" height="50px" rounded="0" flat>
    <v-toolbar density="compact">
      <v-app-bar-nav-icon
        @click="$emit('toggle-navigation')"
      ></v-app-bar-nav-icon>

      <!-- Кнопка з логотипом -->
      <v-btn
        :style="{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '50px',
          height: '50px',
        }"
        @click="goHome"
      ></v-btn>

      <v-spacer></v-spacer>
      <!-- Умовне відображення панелі пошуку -->
      <v-text-field
        v-if="showSearch"
        v-model="searchQuery"
        placeholder="Пошук..."
        variant="outlined"
        density="compact"
        clearable
        hide-details
        class="search-field"
        @blur="closeSearch"
        @input="handleSearch"
        @click:clear="clearSearch"
      ></v-text-field>

      <!-- Кнопка пошуку -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Кнопка корзини -->
      <v-btn icon @click="cartStore.toggleCartDialog()">
        <v-icon>mdi-shopping</v-icon>
      </v-btn>

      <!-- Кнопка акаунта -->
      <v-menu v-model="accountMenu" offset-y>
        <template #activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-if="authStore.token">
            <v-list-item to="/profile">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="goHomeAfterLogout">
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item @click="authStore.toggleSignUp">
              <v-list-item-title>Sign up</v-list-item-title>
            </v-list-item>
            <v-list-item @click="authStore.toggleLogin">
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-toolbar>
  </v-card>

  <SignUp />
  <Login />
</template>

<script>
import PubalkaLogo from "@/assets/images/PUBALKA.png";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/useAuthStore";
import SignUp from "@/components/SignUp.vue";
import Login from "@/components/Login.vue";

export default {
  name: "HeaderSite",
  components: {
    SignUp,
    Login,
  },
  setup() {
    const cartStore = useCartStore();
    const authStore = useAuthStore();

    return { cartStore, authStore };
  },

  data() {
    return {
      logo: PubalkaLogo,
      searchQuery: "",
      showSearch: true,
      accountMenu: false,
      showSignUp: false,
      showLogIn: false,
    };
  },
  methods: {
    onClick() {
      console.log("Logo clicked");
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    goHome() {
      this.$router.push("/");
      this.$emit("category-selected", null);
    },
    goHomeAfterLogout() {
      this.authStore.logout();
      this.goHome();
    },
    handleSearch() {
      this.$emit("search-changed", this.searchQuery);
    },
    clearSearch() {
      this.$emit("search-changed", ""); // Очищаємо пошуковий запит
    },
  },
};
</script>

<style scoped>
.search-field {
  max-width: 300px;
  margin-right: 8px;
}
</style>
