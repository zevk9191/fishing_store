import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/Main.vue';
import AboutUs from '@/components/AboutUs.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Main,
  },
  {
    path: '/ABOUT-US',
    name: 'AboutUs',
    component: AboutUs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
