import api from '@/services/index';

export default {
  install(app: any) {
    app.config.globalProperties.$api = api;
  },
};
