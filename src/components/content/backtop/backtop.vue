<template>
    <div class="backtop">
      <img src="~assets/img/backtop1.svg" alt="">
    </div>
</template>

<script>
export default {
  name: "BackTop"
}
</script>


<style scoped>
  .backtop {
    position: fixed;
    right: 10px;
    bottom: 60px;
  }

  .backtop img {
    width: 45px;
    background-color: #fff;
  }
</style>