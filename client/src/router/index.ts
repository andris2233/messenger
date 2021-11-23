import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    redirect: { name: 'Messages' },
    component: () => import(/* webpackChunkName: 'Main' */ '@/layouts/LayoutMain.vue'),
    meta: { title: 'Messenger', auth: true },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: 'Profile' */ '@/components/views/profile/ViewProfile.vue'),
        meta: { title: 'Profile', auth: true },
      },
      {
        path: 'friends',
        name: 'Friends',
        redirect: { name: 'FriendsMain' },
        component: () => import(/* webpackChunkName: 'Friends' */ '@/components/views/friends/ViewFriends.vue'),
        meta: { title: 'Friends', auth: true },
        children: [
          {
            path: '',
            name: 'FriendsMain',
            component: () => import(
              /* webpackChunkName: 'Friends' */
              '@/components/views/friends/views/ViewFriendsMain.vue'
            ),
          },
          {
            path: 'incoming',
            name: 'FriendsIncoming',
            component: () => import(
              /* webpackChunkName: 'Friends' */
              '@/components/views/friends/views/ViewFriendsIncoming.vue'
            ),
          },
          {
            path: 'outgoing',
            name: 'FriendsOutgoing',
            component: () => import(
              /* webpackChunkName: 'Friends' */
              '@/components/views/friends/views/ViewFriendsOutgoing.vue'
            ),
          },
        ],
      },
      {
        path: 'messages',
        name: 'Messages',
        component: () => import(/* webpackChunkName: 'Messages' */ '@/components/views/messages/ViewMessages.vue'),
        meta: { title: 'Messages', auth: true },
      },
    ] as RouteRecordRaw[],
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'SignIn' },
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

export default router;
