<template>
  <div class="goods">
    <good-list-item v-for="item in goods" :key="item" :goodsitem="item" />
  </div>
</template>


<script>
import GoodListItem from './GoodListItem'

export default {
  name: "GoodList",
  props: {
    good: {
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

</style>