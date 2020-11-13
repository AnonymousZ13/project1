<template>
  <div class="tab-control">
    <div v-for="item in titles" :key="item.abs" class="TabControl-item">
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
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
  }

  .TabControl-item {
    flex: 1;
  }


</style>