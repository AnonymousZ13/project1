<template>
  <div id="home">
    <nav-bar class="homenav">
      <div slot="center">购物街</div>
    </nav-bar>
    <h2>{{recommends}}</h2>
    <h2>-----------</h2>
    <h2>{{banners}}</h2>
  </div>
</template>


<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomedata} from 'network/home'



export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  components: {
    NavBar
  },
  created() {
    //1.请求多个数据
    getHomedata().then(msg =>{
      this.banners = msg.data.banner.list;
      this.recommends = msg.data.recommend.list;
    })
  }
}
</script>


<style scoped>
  .homenav {
    /* 引用了 assets/css/basecss内的变量*/
    background: var(--color-tint);
    color: #fff;
  }
</style>