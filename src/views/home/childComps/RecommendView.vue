<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommends" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>


<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;

    padding: 12px 0 12px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    height: 70px;
    width: 70px;
    margin-bottom: 8px;
  }
</style>