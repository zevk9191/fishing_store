import { defineStore } from "pinia";
import axios from "axios";
import { jwtDecode as decode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
    userRole: localStorage.getItem("userRole") || null,
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
        await this.login({
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

        this.token = response.data.token;
        localStorage.setItem("token", this.token);

        const decoded = decode(this.token);
        this.userRole = decoded.position; // Отримуємо роль з токена
        localStorage.setItem("userRole", this.userRole);
        await this.fetchUser();
        this.user = response.data.user;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || "Login failed";
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.userRole = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
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
        this.userRole = this.user.position; // Оновлюємо роль користувача
        localStorage.setItem("userRole", this.userRole);
      } catch (error) {
        this.logout();
      }
    },
  },
});
