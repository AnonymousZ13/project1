<template>
  <div id="home">
    <nav-bar class="homenav"><div slot="center">购物街</div></nav-bar>
    
    <!-- 通常情况下，这个组件v-show为false即隐藏的
         当istabfixed为true时，即tabcontrol已经滚动到需要吸顶的位置时，显示这个组件
         这个组件由于在scroll外，所以不会跟随滚动，而原始的tabcontrol会跟随滚动下去
         所以会制造出，tabcontrol吸顶的效果
     -->
    <tabControl :titles="['流行', '新款', '风格']" 
                  @tabclick="tabclick"
                  ref="tabControl1" 
                  class="tab-control"
                  v-show="isTabFixed"/>


    <!--:probe-type，把3以number类型传入，没有 ： 则当成字符串传入 -->
    <!-- @scroll,接收scroll.vue传出的自定义事件 -->
    <scroll class="content" ref="scroll" 
      :probe-type="3" 
      @scroll="contentscroll"
      :pull-up-load="true"
      @pullingUp="loadmore">

      <home-swiper :banners="banners" 
      @swiperImageLoad="swiperImageLoad"/>

      <recommend-view :recommends="recommends" />

      <FeatureView></FeatureView>

      <tabControl :titles="['流行', '新款', '风格']" 
                  @tabclick="tabclick"
                  ref="tabControl2" 
                   />

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
      //banners：存放轮播图数据，recommends存放推荐数据

      banners: [],
      recommends: [],

      // 用于存放首页tabcontrol下的数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentIndex: 'pop',

      // 是否展示回到顶部按钮
      isShowbacktop: false,

      /**
       * offsetTop: 元素到offsetparent顶部的距离
       * offsetparent：距离元素最近的具有定位(relative， absolute， fixed)的祖宗元素，
       *              若祖宗都不符合条件，则为body
       * 
       * 这里用tabOffsettop保存 tabcontrol的offsettop值，
       * 用于制作 tabcontrol的吸顶效果
       */
      tabOffSetTop: 0,

      //tab-control是否吸顶
      isTabFixed: false,

      //保存离开home时，滚动的y值（position.y）
      saveY: 0
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
     * home需要调用非子组件的方法，可以在子组件把方法通过$bus.$emit上传到事件总线
     * home.vue通过$bus.$on获取相关方法，itemimageload在组件goodlistitem.vue中
     */
    this.$bus.$on('itemimageload', () => {
      refresh()
    })

    const refresh = this.debounce(this.$refs.scroll.refresh, 10)
  },

  // 当进入改组件时调用
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh()
  },


  //当离开该组件时调用
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },


  methods: {
    /**
     * 防抖函数debounce
     * 防抖函数作用原理
     *  1.被传入debounce的func第一次执行时，timer为null 进入settimeout延迟执行，并给timer赋值
     *  2.在延迟执行的等待过程中，如果这个func第二次被传入debouce，因为timer为真所以 清除掉上一次的settimeout
     *  3.如果在延迟等待过程中没有下一个func传入，则执行调用的func
    */
    debounce(func, delay) {
      let timer = null;
      
      return function(...args) {
        if (timer) clearTimeout(timer);
           
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },
       

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
      };
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
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
      this.isShowbacktop = (-position.y) > 1000;

      //
      this.isTabFixed = (-position.y) > this.tabOffSetTop
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
      
    },

    swiperImageLoad() {
      /**
       * offsettop值，在元素属性中，
       * 但通过 $refs 只能拿到components（组件），其中没有offsettop属性
       * 这里通过 components的 $el 拿到其中的元素标签，再拿到其中的offsettop属性
       * 
       * offsettop，需要在其上组件图片都加载完成后计算的高度才是正确高度（类似于scroll计算的可滚动区域高度）
       * 所以需要监听 轮播图是否加载完成，
       */
      this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }

}
</script>


<style scoped>
/* scoped,里写的属性，只会针对当前 组件起效果 */
  #home {
    /* padding-top: 44px; */
    position: relative;
    /* vh,适口高度 */
    height: 100vh;
  }

  .homenav {
    /* 引用了 assets/css/basecss内的变量*/
    background: var(--color-tint);
    color: #fff;


    /* 在使用浏览器原生滚动时，避免nav-bar随浏览器一起滚动
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }



  /* 吸顶效果，组件外层裹上scroll后失效
    .top-control {
    position: sticky;
    top: 44px;
  } */
  
  .tab-control{
    position: relative;
    z-index: 7;
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