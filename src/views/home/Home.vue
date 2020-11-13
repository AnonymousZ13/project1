<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>

    <home-swiper :banners="banners"/>
  
    <recommend-view :recommends="recommends" />

    <FeatureView></FeatureView>

    <tabControl :titles="['流行', '新款', '风格']"></tabControl>
    <span>aaa</span>
    <span>aaa</span>
    <span>aaa</span>
    <span>aaa</span>
    <span>aaa</span>
    <span>aaa</span>
    <span>aaa</span>
  </div>
</template>


<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomedata} from 'network/home'

// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'




export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    
    NavBar,
    TabControl
  },
  created() {
    //1.请求多个数据
    getHomedata().then(msg =>{
      this.banners = msg.data.banner.list;
      this.recommends = msg.data.recommend.list;
    })
  }
}
</script>


<style scoped>
  .homenav {
    /* 引用了 assets/css/basecss内的变量*/
    background: var(--color-tint);
    color: #fff;
  }
</style>