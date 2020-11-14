<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>

    <home-swiper :banners="banners"/>
  
    <recommend-view :recommends="recommends" />

    <FeatureView></FeatureView>

    <tabControl :titles="['流行', '新款', '风格']" class="top-control"></tabControl>
    
    <div class="empty"></div>
  </div>
</template>


<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomedata, getHomeGoods} from 'network/home'

// import Swiper from 'components/common/swiper/Swiper'
// import SwiperItem from 'components/common/swiper/SwiperItem'




export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      // 用于存放首页tabcontrol下的数据
      goods: {
        'pop': {page: 0, list: []},
        // 'news': {page: 0, list: []},
        // 'sell': {page: 0, list: []}
      }
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
    this.getHomedata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    // this.getHomeGoods('new');
    // this.getHomeGoods('sell');
  },
  methods: {
    getHomedata(){
      getHomedata().then(msg =>{
        console.log(msg.data.banner.list);
        console.log(msg.data.recommend.list);
        this.banners = msg.data.banner.list;
        this.recommends = msg.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(goodsinf => {
        console.log(goodsinf);
        // this.goods[type].list.push(...goodsinf.data.list)
      })
    }
  }
}
</script>


<style scoped>
  #home {
    padding-top: 44px;
  }

  .homenav {
    /* 引用了 assets/css/basecss内的变量*/
    background: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }


  .empty {
    width: 180px;
    height: 800px;
    border: solid 1px black;
  }

  .top-control {
    position: sticky;
    top: 44px;
  }
</style>