import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import VueProgressBar from 'vue-progressbar';
import VueLazyload from 'vue-lazyload';

const options = {
  color: '#42b983',
  failedColor: '#874b4b',
  thickness: '6px',
  transition: {
    speed: '0.2s',
    opacity: '0.7s',
    termination: 300
  },
  autoRevert: true,
  inverse: false,
}

Vue.use(VueProgressBar, options)


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
