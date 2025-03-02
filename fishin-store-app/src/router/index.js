import { createRouter, createWebHistory } from "vue-router";
import Main from "@/components/Main.vue";
import AboutUs from "@/components/AboutUs.vue";
import ContactUs from "@/components/ContactUs.vue";
import UserProfil from "@/components/UserProfil.vue";
import AdminProfil from "@/components/AdminProfil.vue";
import Login from "@/components/Login.vue";
import { useAuthStore } from "@/store/useAuthStore";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Main,
  },
  {
    path: "/ABOUT-US",
    name: "AboutUs",
    component: AboutUs,
  },
  {
    path: "/CONTACT-US",
    name: "ContactUs",
    component: ContactUs,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user",
    name: "UserProfile",
    component: UserProfil,
    meta: { requiresAuth: true, role: "Customer" },
  },
  {
    path: "/admin",
    name: "AdminProfile",
    component: AdminProfil,
    meta: { requiresAuth: true, role: "Admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      return next("/login"); // Якщо немає токена, перекидаємо на логін
    }

    if (to.meta.role && to.meta.role !== authStore.userRole) {
      return next("/"); // Якщо роль не співпадає, перекидаємо на головну
    }
  }

  next();
});

export default router;
