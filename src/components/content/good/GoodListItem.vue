<template>
    <div>
        <img :src="goodsitem.show.img" alt="">
    </div>
</template>

<script>


export default {
  name: "GoodListItem",
  props: {
    goodsitem: {
      type: Object,
      default() {
        return []
      }
    }
  }
}
</script>

<script>
export default {
  
}
</script>