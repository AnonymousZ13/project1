<template>
  <div id="main-tab-bar">
    <tab-bar>
      <!-- path传入tabbar-item的props属性中，用于路由跳转 -->
      <tab-bar-item path="/home" activeColor="#E7857A">
        <img slot="item-icon" src="~assets/img/home1.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/home.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/catagory" activeColor="#E7857A">
        <img slot="item-icon" src="~assets/img/catagory.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/catagory1.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="#E7857A">
        <img slot="item-icon" src="~assets/img/cart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/cart1.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="#E7857A">
        <img slot="item-icon" src="~assets/img/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/profile1.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item> 
    </tab-bar>
  </div>
</template>



<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBar-item'



export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
  /* #main-tab-bar {
    height: 50px;
  } */
</style>