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
      ></v-text-field>

      <!-- Кнопка пошуку -->
      <v-btn icon @click="toggleSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <!-- Кнопка корзини -->
      <v-btn icon @click="$emit('open-cart')">
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
          <v-list-item @click="openSignUpModal">
            <v-list-item-title>Sign up</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openLogInModal">
            <v-list-item-title>Log in</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- Модальне вікно для реєстрації -->
    <v-dialog v-model="showSignUp" max-width="500px">
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    label="First name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    label="Last name"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="phone"
                    :rules="phoneRules"
                    label="Phone"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeSignUpModal">Cancel</v-btn>
          <v-btn
            text
            color="primary"
            :disabled="!valid"
            @click="submitSignUpForm"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Модальне вікно для входу -->
    <v-dialog v-model="showLogIn" max-width="400px">
      <v-card>
        <v-card-title>Log In</v-card-title>
        <v-card-text>
          <v-form v-model="loginValid">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="loginEmail"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="loginPassword"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeLogInModal">Cancel</v-btn>
          <v-btn
            text
            color="primary"
            :disabled="!loginValid"
            @click="submitLogInForm"
          >
            Log In
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import PubalkaLogo from "@/assets/images/PUBALKA.png";

export default {
  name: "HeaderSite",
  data() {
    return {
      logo: PubalkaLogo,
      searchQuery: "",
      showSearch: false,
      accountMenu: false, // Для меню акаунта
      showSignUp: false, // Для модального вікна реєстрації
      showLogIn: false, // Для модального вікна входу
      valid: false,
      loginValid: false,
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      loginEmail: "",
      loginPassword: "",
      nameRules: [
        (value) => !!value || "Name is required.",
        (value) =>
          (value && value.length <= 10) ||
          "Name must be less than 10 characters.",
      ],
      emailRules: [
        (value) => !!value || "E-mail is required.",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid.",
      ],
      phoneRules: [
        (value) => !!value || "Phone number is required.",
        (value) =>
          (/^\d{10,15}$/.test(value) && value.length <= 15) ||
          "Phone number must be valid and less than 15 digits.",
      ],
      passwordRules: [
        (value) => !!value || "Password is required.",
        (value) =>
          value.length >= 8 || "Password must be at least 8 characters.",
      ],
    };
  },
  methods: {
    onClick() {
      console.log("Logo clicked");
    },
    toggleSearch() {
      this.showSearch = !this.showSearch;
    },
    openSignUpModal() {
      this.showSignUp = true;
      this.accountMenu = false; // Закриваємо меню, якщо відкриваємо модалку
    },
    closeSignUpModal() {
      this.showSignUp = false;
    },
    submitSignUpForm() {
      if (this.valid) {
        console.log("Sign Up Submitted:", {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phone: this.phone,
          password: this.password,
        });
        this.closeSignUpModal();
      }
    },
    openLogInModal() {
      this.showLogIn = true;
      this.accountMenu = false; // Закриваємо меню, якщо відкриваємо модалку
    },
    closeLogInModal() {
      this.showLogIn = false;
    },
    submitLogInForm() {
      if (this.loginValid) {
        console.log("Log In Submitted:", {
          email: this.loginEmail,
          password: this.loginPassword,
        });
        this.closeLogInModal();
      }
    },
    goHome() {
      this.$router.push("/");
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
