import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '@/store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: () => import(/* webpackChunkName: 'Main' */ '@/layouts/LayoutMain.vue'),
    meta: { title: 'Messenger', auth: true },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: '' */ '@/components/views/profile/ViewProfile.vue'),
        meta: { title: 'Profile', auth: true },
      },
      {
        path: 'friends',
        name: 'Friends',
        component: () => import(/* webpackChunkName: '' */ '@/components/views/profile/ViewProfile.vue'),
        meta: { title: 'Friends', auth: true },
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import(/* webpackChunkName: '' */ '@/components/views/profile/ViewProfile.vue'),
        meta: { title: 'Messages', auth: true },
      },
    ] as RouteRecordRaw[],
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: 'Auth' */ '@/layouts/LayoutAuth.vue'),
    meta: { title: 'Messenger' },
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import(
          /* webpackChunkName: 'Auth' */
          '@/components/views/auth/ViewAuthSignIn.vue'
        ),
        meta: { title: 'Login' },
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import(
          /* webpackChunkName: 'Auth' */
          '@/components/views/auth/ViewAuthSignUp.vue'
        ),
        meta: { title: 'Register' },
      },
    ] as RouteRecordRaw[],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (to.meta.auth && !store.state.user.tokens.accessToken) next({ name: 'SignIn' });
  else next();
});

export default router;
