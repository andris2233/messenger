import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import PageMessenger from '@/views/PageMessenger.vue';
import PageAuth from '@/views/PageAuth.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'messenger',
    component: PageMessenger,
    meta: {
      auth: true,
      title: 'Мессенджер',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: PageAuth,
    meta: {
      title: 'Мессенджер | Авторизация',
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;

  next();
});

export default router;
