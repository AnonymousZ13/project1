<template>
  <div id="app">

  <!-- 
    当路由跳转时，原来位置的组件会被销毁destory，
    所以在组件间跳转时，无法保存跳转前组件的状态
    被<keep-alive>标签包裹的组件在跳转后不会被销毁，
   -->
  <keep-alive>
    <router-view />
  </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/main_tabbar'

export default {
  name: 'App',
  components: {
    MainTabBar,
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>