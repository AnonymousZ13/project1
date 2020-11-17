<template>
    <div class="goodsitem">
      <!-- {{goodsItem.show.img}} -->
      <!-- @load监听图片加载完成，并调用后面的函数 -->
        <img :src="goodsItem.show.img" alt="" @load="imageload">
        <div class="goodsinfo">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{'￥' + goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>

        </div>
    </div>
</template>

<script>


export default {
  name: "GoodListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return []
      }
    }
  },
  methods: {
    imageload() {
      // $bus。
      this.$bus.$emit('itemimageload')
    }
  }
}
</script>

<style scoped>
  .goodsitem {
    width: 48%;

    /* 删除改属性，goodsinfo下的内容会消失 */
    position: relative;
    z-index: -1;
  }

  .goodsitem img {
    width: 100%;
    /* height: 85%; */
    border-radius: 5px;
  }

  .goodsinfo {
    font-size: 12px;
    /* position: absolute; */
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goodsinfo p {
    overflow: hidden;
    /* 文字超出的部分用‘...’表示 */
    text-overflow: ellipsis;
    /* 使文字在一行内显示 */
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goodsinfo .price {
    color: var(--color-high-text);
    margin-right: 20px; 
    /* margin-left: 10px; */
  }

    /* 删除改属性，伪类无法显示 */
  .collect {
    position: relative;
  }

  /* 问题：在收藏数前面通过伪类添加小图标 */
  .collect::before {
    content: " ";
    /* 给伪类定位 */
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/collect.svg") 0 0/14px 14px no-repeat;
  }


</style>