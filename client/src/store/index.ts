import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';

import user from './modules/user';

export const key: InjectionKey<Store<any>> = Symbol('root');
export const store = createStore({ modules: { user } });

export function useStore() {
  return baseUseStore(key);
}

// const files = require.context('./modules', false, /\.ts$/);
// files
//   .keys()
//   .forEach((fileKey) => {
//     store.registerModule(
//       fileKey.replace(/(\.\/|\.ts)/g, ''),
//       files(fileKey).default,
//     );
//   });
