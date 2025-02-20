<template>
  <v-dialog v-model="authStore.isLoginVisible" max-width="400px">
    <v-card class="login-card">
      <v-card-title class="text-center text-h5 font-weight-bold">
        Log In
      </v-card-title>
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
                  variant="outlined"
                  class="custom-input"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="loginPassword"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                  variant="outlined"
                  class="custom-input"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert v-if="authStore.error" type="error" class="mt-3">{{
            authStore.error
          }}</v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-space-between px-4 pb-4">
        <v-btn class="custom-btn cancel-btn" @click="authStore.toggleLogin">
          Cancel
        </v-btn>
        <v-btn
          class="custom-btn submit-btn"
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

<style scoped>
.login-card {
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
}

.custom-input {
  border-radius: 8px;
}

.custom-btn {
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  box-shadow: 0px 4px 6px rgba(244, 67, 54, 0.2);
}

.cancel-btn:hover {
  background-color: #d32f2f;
  box-shadow: 0px 6px 10px rgba(244, 67, 54, 0.3);
}

.submit-btn {
  background-color: #4caf50;
  color: white;
  box-shadow: 0px 4px 6px rgba(76, 175, 80, 0.2);
}

.submit-btn:hover {
  background-color: #388e3c;
  box-shadow: 0px 6px 10px rgba(76, 175, 80, 0.3);
}

.submit-btn:disabled {
  background-color: #bdbdbd;
  color: #757575;
  box-shadow: none;
  cursor: not-allowed;
}
</style>
