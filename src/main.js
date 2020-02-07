import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  observer: true
})

import './assets/styles/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
