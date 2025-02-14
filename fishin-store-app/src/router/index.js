import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/components/Main.vue';
import AboutUs from '@/components/AboutUs.vue';
import ContactUs from '@/components/ContactUs.vue';


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
  {
    path: '/CONTACT-US',
    name: 'ContactUs',
    component: ContactUs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
