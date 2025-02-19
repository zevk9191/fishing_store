<template>
  <v-dialog v-model="authStore.isSignUpVisible" max-width="500px">
    <v-card>
      <v-card-title>Sign Up</v-card-title>
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
          <v-alert v-if="authStore.error" type="error">{{
            authStore.error
          }}</v-alert>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn text @click="authStore.toggleSignUp">Cancel</v-btn>
        <v-btn text color="primary" @click="submitSignUpForm"> Submit </v-btn>
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
    };
  },
};
</script>

<style scoped></style>
