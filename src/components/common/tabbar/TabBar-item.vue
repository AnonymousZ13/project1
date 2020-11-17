<template>
  <div class="tab-bar-item" @click="itemclick">
    <!-- v-if/v-else -->
    <div v-if="!isActive" class="mainItem">
      <slot name="item-icon"></slot>
    </div>
    <div v-else class="mainItem">
      <slot name="item-icon-active"></slot>
    </div>
    <!-- :style动态绑定属性 -->
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
      //indexOf返回某个指定字符串值在字符串中首次出现的位置
      //如果要检索的字符串没有出现，则返回 -1
      return this.$route.path.indexOf(this.path) !== -1
    },

    //通过判定路由活跃状态，动态绑定样式表
    activeStyle() {
      //(? :)条件运算符
      //this.isActive为真执行{color: this.activeColor}为假执行{}
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {

    //绑定路由跳转
    itemclick() {
      this.$router.replace(this.path)
      console.log(this.isActive);
      console.log(this.$router);
    }
  }
}
</script>


<style scoped>
  

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    /* height: 49px; */
    font-size: 12px;
  }

  .tab-bar-item img {

    width: 20%;
    margin-top: 8%;
    
    /* width: 20px; */
    
  }
  
  .mainItem {
    height: 60%;
    /* width: 100%; */
  }

  /* .menu {
    color: rgb(244,128,130);
    margin-top: 8%;
  }

  .active {
    color: rgb(255, 165, 39)
  } */
</style>