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
  data() {
    return {
      scroll: null
    }
  },  
  mounted() {
    console.log('ssss');
    this.scroll = new BScroll(this.$refs.wrapper,{
      click: true,
      tap: true
    })

    // console.log(this.scroll);
  }
}
</script>

<style scoped>

</style>