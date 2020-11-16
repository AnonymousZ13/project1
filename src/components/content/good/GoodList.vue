<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :key="item.abs" :goodsItem="item" />
    <!-- <div>{{goods}}</div> -->
  </div>
</template>


<script>
import GoodListItem from './GoodListItem'

export default {
  name: "GoodList",
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style scoped>
  .goods {
    display: flex;

    /* 让弹性布局根据盒子大小分行排列 */
    flex-wrap: wrap;
    /* 当弹性布局内部盒子宽度不足100%，选择更合适的排列方式，而不是左对齐 */
    justify-content:space-around;

    margin-bottom: 55px;
  }
</style>