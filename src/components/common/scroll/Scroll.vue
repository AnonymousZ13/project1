<template>
  <!--ref: 通过$refs.绑定的名称,更加准确的拿到对应对象 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },  
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      tap: true,

      //probeType：是否监听滚动位置（用于设置返回顶部按钮）
      probeType: this.probeType,
      //pullUpLoad：用于设置上拉加载更多
      pullUpLoad: this.pullUpLoad
    })

    //监听滚动位置
    this.scroll.on('scroll', position => {
      // console.log(position);
      //$emit自定义事件
      this.$emit('scroll', position)
    })

    //监听上拉事件
    this.scroll.on('pullingUp', () => {
      // console.log('shangla jaiszaisgengd uo');
      this.$emit('pullingUp')
    })
  },
 
  methods: {

    //设置返回顶部
    scrollTo(x =0, y = 0, time = 400){
      //先判断是否存在scroll对象，再调用对应方法
      this.scroll && this.scroll.scrollTo(x, y, time)
    },

    //监听上拉事件只会执行一次，所以在上拉加载更多完成一次后，需要先结束监听，再重新监听
    finishPullUp() {
      this.scroll.finishPullUp()
    },

    //refresh,当监听到图片加载完成，调用scroll对象的refresh方法，重新计算可滚动高度
    refresh() {
      // console.log('---------');
      this.scroll && this.scroll.refresh()
    },

    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>