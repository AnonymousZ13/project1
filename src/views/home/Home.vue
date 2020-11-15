<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>

    <home-swiper :banners="banners"/>
  
    <recommend-view :recommends="recommends" />

    <FeatureView></FeatureView>

    <tabControl :titles="['流行', '新款', '风格']" class="top-control"
                @tabclick="tabclick" />
    
    <good-list :goods="showGoods" />
    
    <div class="empty"></div>
  </div>
</template>


<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/good/GoodList'

import {getHomedata, getHomeGoods} from 'network/home'
// import GoodList from '../../components/content/good/GoodList.vue'

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
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentIndex: 'pop'
    }
  },

  computed: {
    // 计算属性，计算首页商品展示的数据
    showGoods() {
      return this.goods[this.currentIndex].list
    }
  },

  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    
    NavBar,
    TabControl,
    GoodList
  },

  created() {

    //1.请求多个数据
    this.getHomedata();
    //2.请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

    // this.getHomeGoods();
  },

  methods: {
    /**
     * 事件监听相关方法
     */
    tabclick(index) {
      switch(index) {
        case 0:
          this.currentIndex = 'pop'
          break;
        case 1: 
          this.currentIndex = 'new'
          break;
        case 2:
          this.currentIndex = 'sell'
          break;
      }
    },

    /**
     * 网络请求相关方法
     */
    getHomedata(){
      getHomedata().then(msg =>{
        // console.log(msg.data.banner.list);
        // console.log(msg.data.recommend.list);
        this.banners = msg.data.banner.list;
        this.recommends = msg.data.recommend.list;
      })
    },


  //请求商品展示页数据，请求不到，用本地数据代替
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(msg => {
        // console.log(msg);
        this.goods[type].list.push(...msg.data.list);
        this.goods[type].page += 1;
        // console.log(this.goods['pop'].list);

      })
    }
    // getHomeGoods() {
    //   getHomeGoods().then(goodsinf => {
    //     console.log(goodsinf);
    //   })
    // }
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