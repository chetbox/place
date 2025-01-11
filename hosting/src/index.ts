import Vue from 'vue';
import Editor from './Editor.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Editor),
}).$mount('#app');
