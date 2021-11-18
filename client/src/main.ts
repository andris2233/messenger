import { createApp } from 'vue';
import App from './App.vue';

import router from './router';

import { store, key } from './store';

import './middleware';

createApp(App)
  .use(router)
  .use(store, key)
  .mount('#app');
