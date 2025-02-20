<template>
  <v-dialog v-model="authStore.isLoginVisible" max-width="400px">
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
          <v-alert v-if="authStore.error" type="error">{{
            authStore.error
          }}</v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="authStore.toggleLogin">Cancel</v-btn>
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
</template>

<script>
import { useAuthStore } from "@/store/useAuthStore";
import { ref } from "vue";

export default {
  name: "LoginMenu",
  setup() {
    const authStore = useAuthStore();
    const loginEmail = ref("");
    const loginPassword = ref("");
    const loginValid = ref(false);

    const emailRules = [(v) => !!v || "E-mail is required"];
    const passwordRules = [(v) => !!v || "Password is required"];

    const submitLogInForm = async () => {
      await authStore.login({
        email: loginEmail.value,
        password: loginPassword.value,
      });
      if (!authStore.error) {
        authStore.toggleLogin();
        clearFields();
      }
    };

    const clearFields = () => {
      loginEmail.value = "";
      loginPassword.value = "";
    };

    return {
      authStore,
      loginEmail,
      loginPassword,
      loginValid,
      emailRules,
      passwordRules,
      submitLogInForm,
    };
  },
};
</script>

<style scoped></style>
