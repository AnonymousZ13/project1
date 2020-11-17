import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/**
 * vue中并未自带$bus方法 ，需要在vue原型上注册
 */
Vue.prototype.$bus = new Vue()

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