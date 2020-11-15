<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="item" class="TabControl-item"
     :class="{active: index === currentIndex}"
     @click="itemclick(index)">
      <span>{{item}}</span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    } 
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: { 
    itemclick(index) {
      //使被选择的组件变色
      this.currentIndex = index;

      // 将点击事件传到home.vue里
      // home.vue通过不同的点击，将不同的数据传入goodslist.vue里
      //父组件向子组件传递数据用props
      //子组件向父组件传递用$emit
      this.$emit('tabclick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 45px;
    line-height: 45px;
    background-color: #fff;
  }

  .TabControl-item {
    flex: 1;
    
  }

  .active {
    color: var(--color-high-text)
  }

  .active span {
    border-bottom: solid 2px var(--color-high-text);
  }
  .tab-control span {
    padding: 6px;
  }

</style>