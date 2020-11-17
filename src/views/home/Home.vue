<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>
    
    <!--:probe-type，把3以number类型传入，没有 ： 则当成字符串传入 -->
    <!-- @scroll,接收scroll.vue传出的自定义事件 -->
    <scroll class="content" ref="scroll" 
      :probe-type="3" 
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadmore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends" />
      <FeatureView></FeatureView>
      <tabControl :titles="['流行', '新款', '风格']" class="top-control"
                  @tabclick="tabclick" />
      <good-list :goods="showGoods" />
    </scroll>

    <!-- 无法直接监听组件的点击，需要加上  .native  -->
    <back-top @click.native="backclick" v-show="isShowbacktop" />
    
  </div>
</template>


<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/good/GoodList'
import BackTop from 'components/content/backtop/backtop'

import {getHomedata, getHomeGoods} from 'network/home'
import Backtop from '../../components/content/backtop/backtop'

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
      currentIndex: 'pop',
      isShowbacktop: false
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
    Scroll,
    TabControl,
    GoodList,
    BackTop
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
  mounted() {
    /**
     * 监听事件总线
     */
    this.$bus.$on('itemimageload', () => {

      this.$refs.scroll.refresh()
    })
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

        this.$refs.scroll.finishPullUp()
      })
    },
    // getHomeGoods() {
    //   getHomeGoods().then(goodsinf => {
    //     console.log(goodsinf);
    //   })
    // }

    //返回顶部
    backclick() {
      //scrollTo(x,y,time)
      this.$refs.scroll.scrollTo()
    },
    contentscroll(position) {
      // console.log(position);
      //y值为负值，当y > 1000显示回到顶部按钮
      this.isShowbacktop = (-position.y) > 1000
    },
    
    loadmore() {
      setTimeout(() => {
        this.getHomeGoods(this.currentIndex);
      },1000)
      
      /**
       * 重要！！！！
       * better-scroll开始时，会计算wrapper 和content的高度，并
       * 计算出可滚动区域(scrollerhight)，在上拉加载更多，或图片加载出来后，content
       * 高度会变高，但better-scroll不会重新计算高度，会导致部分区域无法滚动
       * 所以调用scroll.refresh() 方法让bs重新计算高度
       * 把监听到的图片加载完成通过$bus.$emit发射到事件总线上，home.vue通过$bus.$on接收并调用refresh方法
       * this.$refs.scroll.scroll.refresh()
       */
      
    }
  }

}
</script>


<style scoped>
/* scoped,里写的属性，只会针对当前 组件起效果 */
  #home {
    padding-top: 44px;
    position: relative;
    /* vh,适口高度 */
    height: 100vh;
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

  .content {
    overflow: hidden; 
    position: absolute;
    top: 44px;
    bottom: 51px;
    left: 0;
    right: 0;
    /* height: calc(100% - 95px);
    margin-top: 44px; */
  }
</style>