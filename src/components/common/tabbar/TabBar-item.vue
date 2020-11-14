<template>
  <div class="tab-bar-item" @click="itemclick">
    <div v-if="!isActive" class="mainItem">
      <slot name="item-icon"></slot>
    </div>
    <div v-else class="mainItem">
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle" class="menu">
      <slot name="item-text"></slot>
    </div>
      
  </div>
</template>



<script>
export default {
  name: "TabBarItem",
  props: {
    
    //每个组件传入不同的路由
    path: String,


    //通过传入的颜色决定，组件处于活跃时的颜色。
    activeColor: {
      type: String,
      default: '#E7857A'
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  //计算属性
  computed: {
    //判断路由是否处于活跃
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },

    //通过判定路由活跃状态，动态绑定样式表
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {

    //绑定路由跳转
    itemclick() {
      this.$router.replace(this.path)
    }
  }
}
</script>


<style scoped>
  

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 60px;
    font-size: 12px;
    /* height: 49px; */
  }

  .tab-bar-item img {

    width: 25%;
    margin-top: 15%;
    margin-bottom: 5%;
    
    /* width: 20px; */
    
  }
  
  /* .mainItem {
    height: 50%;
    width: 100%;
  } */

  /* .menu {
    color: rgb(244,128,130);
    margin-top: 8%;
  }

  .active {
    color: rgb(255, 165, 39)
  } */
</style>