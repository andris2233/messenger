import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiPlugin from './plugins/api';

createApp(App)
  .use(store)
  .use(router)
  .use(ApiPlugin)
  .mount('#app');
