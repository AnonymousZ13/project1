import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




// import axios from 'axios'
// axios.get('/src/assets/img/cart.svg').then(res => {
//   console.log(res);
// }).catch(() => {
//   console.log('err');
// })