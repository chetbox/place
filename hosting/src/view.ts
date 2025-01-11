import Vue from 'vue';
import Viewer from './Viewer.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Viewer),
}).$mount('#app');
