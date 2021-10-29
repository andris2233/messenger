import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PageMessenger from '@/views/PageMessenger.vue';
import PageAuth from '@/views/PageAuth.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'messenger',
    component: PageMessenger,
  },
  {
    path: '/login',
    name: 'login',
    component: PageAuth,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
