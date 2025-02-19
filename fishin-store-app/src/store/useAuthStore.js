import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isSignUpVisible: false,
    isLoginVisible: false,
    error: null,
  }),
  actions: {
    toggleSignUp() {
      this.isSignUpVisible = !this.isSignUpVisible;
    },
    toggleLogin() {
      this.isLoginVisible = !this.isLoginVisible;
    },
    async signUp(userData) {
      try {
        const response = await axios.post("http://localhost:3000/api/signup", {
          first_name: userData.firstname,
          last_name: userData.lastname,
          phone_number: userData.phone,
          email: userData.email,
          password: userData.password,
        });
        this.user = response.data.user;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || "Registration failed";
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          email: credentials.email,
          password: credentials.password,
        });
        this.user = response.data.user;
        this.token = response.data.token;
        localStorage.setItem("token", this.token);
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await axios.get(
          "http://localhost:3000/api/auth/user",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = response.data;
      } catch (error) {
        this.logout();
      }
    },
  },
});
