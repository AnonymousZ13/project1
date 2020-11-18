<template>
   <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :herf="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index'

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    //监听轮播图是否加载完成，以便计算tab-control吸顶时的高度（tapOffsetTop值

    //轮播图加载完成只需发射一次 事件就行，这时计算的offsettop已经是正确的值
    //没必要每一张图片加载完成发送一次，使用isLoad进行记录
    imageLoad() {
      if (!this.isLoad) {
         this.$emit('swiperImageLoad');
         this.isLoad = true;
      }
    }
  }
}
</script>

<style scoped>

</style>