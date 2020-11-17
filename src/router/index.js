import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Catagory = () => import('views/catagory/Catagory')
const Profile = () => import('views/profile/Profile')
const Cart = () => import('views/cart/Cart')


//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
  {
    // 默认路径
    path:'',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/catagory',
    component: Catagory
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/cart',
    component: Cart
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})



export default router