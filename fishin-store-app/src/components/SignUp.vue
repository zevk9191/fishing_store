<template>
  <v-dialog v-model="authStore.isSignUpVisible" max-width="500px">
    <v-card class="dialog-card">
      <v-card-title class="dialog-title">Sign Up</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="firstname"
                  :rules="nameRules"
                  label="First name"
                  required
                  class="custom-input"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  v-model="lastname"
                  :rules="nameRules"
                  label="Last name"
                  required
                  class="custom-input"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                  class="custom-input"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="phone"
                  :rules="phoneRules"
                  label="Phone"
                  required
                  class="custom-input"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  required
                  class="custom-input"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-alert v-if="authStore.error" type="error" class="error-alert">
            {{ authStore.error }}
          </v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions class="dialog-actions">
        <v-btn text class="cancel-btn" @click="authStore.toggleSignUp"
          >Cancel</v-btn
        >
        <v-btn text class="submit-btn" @click="submitSignUpForm">
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { useAuthStore } from "@/store/useAuthStore";
import { ref } from "vue";

export default {
  name: "SignUpMenu",
  setup() {
    const authStore = useAuthStore();
    const firstname = ref("");
    const lastname = ref("");
    const email = ref("");
    const phone = ref("");
    const password = ref("");
    const form = ref(null);

    const nameRules = [(v) => !!v || "Name is required"];
    const emailRules = [(v) => !!v || "E-mail is required"];
    const phoneRules = [(v) => !!v || "Phone is required"];
    const passwordRules = [(v) => !!v || "Password is required"];

    const clearFields = () => {
      firstname.value = "";
      lastname.value = "";
      email.value = "";
      phone.value = "";
      password.value = "";
    };

    const submitSignUpForm = async () => {
      const { valid } = await form.value.validate();
      if (!valid) return;

      await authStore.signUp({
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
      });

      if (!authStore.error) {
        authStore.toggleSignUp();
        clearFields();
      }
    };

    return {
      authStore,
      firstname,
      lastname,
      email,
      phone,
      password,
      form,
      nameRules,
      emailRules,
      phoneRules,
      passwordRules,
      submitSignUpForm,
      clearFields,
    };
  },
};
</script>

<style scoped>
.dialog-card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.dialog-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
}

.dialog-actions {
  display: flex;
  justify-content: space-between;
  padding: 16px;
}

.custom-input {
  border-radius: 8px;
  background-color: #f9f9f9;
  padding: 10px;
}

.error-alert {
  margin-top: 10px;
}

.cancel-btn {
  color: #f44336;
}

.submit-btn {
  background-color: #4caf50;
  color: white;
}
</style>
