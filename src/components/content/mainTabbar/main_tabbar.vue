<template>
  <div id="main-tab-bar">
    <tab-bar>
      <tab-bar-item path="/home" activeColor="rgb(255, 165, 39)">
        <img slot="item-icon" src="~assets/img/imgred3.png" alt="">
        <img slot="item-icon-active" src="~assets/img/imgyellow1.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/catagory" activeColor="rgb(255, 165, 39)">
        <img slot="item-icon" src="~assets/img/imgred2.png" alt="">
        <img slot="item-icon-active" src="~assets/img/imgyellow4.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="rgb(255, 165, 39)">
        <img slot="item-icon" src="~assets/img/imgred1.png" alt="">
        <img slot="item-icon-active" src="~assets/img/imgyellow2.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="rgb(255, 165, 39)">
        <img slot="item-icon" src="~assets/img/imgred4.png" alt="">
        <img slot="item-icon-active" src="~assets/img/imgyellow3.png" alt="">
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