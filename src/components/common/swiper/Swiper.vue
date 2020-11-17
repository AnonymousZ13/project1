<template>
  <div id="hy-swiper">
    <!-- 移动端浏览器触摸事件
            1.touchstart:触摸开始，多点触控
            2.touchmove: 接触点改变，滑动时
            3.touchend: 触摸结束时，手指离开屏幕时
       -->
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove"
      @touchend="touchEnd">
      <slot></slot>   
    </div>
    <slot name="indicator"></slot>
    <div class="indicator">
      <!-- v-if后面的条件为false时，对应的元素及其子元素不会被渲染 -->
      <slot name="indicator" v-if="showIndicator && slideCount>1">
        <div v-for="(item, index) in slideCount" class="indi-item" :class="{active:index === currentIndex-1}"
          :key="index">
        </div>
      </slot>
    </div>
  </div>
</template>




<script>
export default {
  name: "Swiper",
  props: {
    //多久滚动一张图片
    interval: {
      type: Number,
      default: 3000
    },
    //轮播延迟时间
    animDuration: {
      type: Number,
      default: 300
    },
    //滚动比例，手动滚动超过0.25会进入下一张
    moveRatio: {
      type: Number,
      default: 0.25
    },
    //指示器，图片下方原点，默认显示
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data: function() {
    return {
      slideCount: 0, //元素个数
      totalWidth: 0, //swiper的宽度
      swiperStyle: {}, //swiper的样式
      currentIndex: 1, //当前的index
      scrolling: false, //是否正在滚动
    }
  },

  // 生命周期函数，组件被挂载后调用
  mounted: function() {
    //1.操作DOM，在前后添加slide
    setTimeout(() => {
      this.handleDom();

      //2.开启定时器
      this.startTimer();
    }, 100);
  },
  methods: {
    /**
     * 定时器操作
     */
    startTimer: function() {
      // setInterval: 按照指定的周期来调用函数或表达式，直到clearInterval()被调用或窗口被关闭 ，形式像setTimeout,
      this.playTimer = window.setInterval(() =>{
        //每滚动一张图片，currentindex +1
        this.currentIndex++;
        //每滚动一张图片计算一次当前位置
        this.scrollContent(-this.currentIndex * this.totalWidth);
        //interval,多久滚动一张图片，props中的属性，调用setinerval时传入的参数
      }, this.interval)
    },

    stopTimer: function() {
      //停止setInterval方法，即停止计时
      window.clearInterval(this.playTimer);
    },

    /**
     * 滚动到正确位置
     */
    scrollContent: function(currentPosition) {
      //0.设置正在滚动
      this.scrolling = true;

      //1.开始滚动动画
      this.swiperStyle.transition = 'transform' + this.animDuration + 'ms';

      this.setTransform(currentPosition);

      //2.判断滚动到的位置
      this.checkPosition();

      //3.滚动完成
      this.scrolling = false
    },

    /**
     * 校验正确的位置
     */
    checkPosition: function() {
      window.setTimeout(() => {
        //1.校验正确的位置
        this.swiperStyle.transition = '0ms';
        if (this.currentIndex >= this.slideCount + 1) { 
          this.currentIndex = 1;
          this.setTransform(-this.currentIndex * this.totalWidth);
        } else if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount;
          this.setTransform(-this.currentIndex * this.totalWidth);
        }

        //2.结束移动后的回调
        this.$emit('transitionEnd', this.currentIndex -1);
      }, this.animDuration)
    },

    /**
     * 设置移动的位置
     */
    setTransform: function(position) {
      //translate3d(xpx, ypx, zpx)
      this.swiperStyle.transform = `translate3d(${position}px, 0, 0)`;
      this.swiperStyle['-webkit-transform'] = `translate3d(${position}px), 0, 0`;
      this.swiperStyle['-ms-transform'] = `translate3d(${position}px), 0, 0`;
    },

    /**
     * 操作DOM，在DOM前后添加slide
     */
    handleDom: function() {
      let swiperE1 = document.querySelector('.swiper');
      let slidesEls = swiperE1.getElementsByClassName('slide');

      //2.保存个数
      this.slideCount = slidesEls.length;

      //3.如果大于1个，那么在前后分别添加一个slide
      if (this.slideCount > 1) {
        let cloneFirst = slidesEls[0].cloneNode(true);
        let cloneLast = slidesEls[this.slideCount - 1].cloneNode(true);
        swiperE1.insertBefore(cloneLast, slidesEls[0]);
        swiperE1.appendChild(cloneFirst);
        this.totalWidth = swiperE1.offsetWidth;
        this.swiperStyle = swiperE1.style;
      }

      //4.让swiper元素，显示第一个（目前是显示前面添加的最后一个元素）
      this.setTransform(-this.totalWidth);
    },

    /**
     * 拖动事件的处理
     */
    touchStart: function(e) {
      //1.如果正在滚动，不可以拖动
      if (this.scrolling) return;

      //2.停止计时器
      this.stopTimer();

      //3.保存开始滚动的位置
      this.startX = e.touches[0].pageX;
    },

    touchMove: function(e) {
      //1.计算出用户拖动的距离
      this.currentX = e.touches[0].pageX;
      this.distance = this.currentX - this.startX;
      let currentPosition = -this.currentIndex * this.totalWidth;
      let moveDistance = this.distance + currentPosition;

      //2.设置当前位置
      this.setTransform(moveDistance);
    },

    touchEnd: function(e) {
      //1.获取移动距离
      let currentMove = Math.abs(this.distance);

      //2.判断最终距离
      if (this.distance === 0) {
        return
      } else if (this.distance > 0 && currentMove > this.totalWidth * this.moveRatio) {
        //右边移动超过0.5
        this.currentIndex--}
    else if (this.distance < 0 && currentMove > this.totalWidth * this.moveRatio){
        //向左移动超过0.5
        this.currentIndex++
    }

      //3.移动到正确的位置
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //4.移动完成后重新开启定时器
      this.startTimer();
    },

    /**
     * 控制上一个，下一个
     */
    previous: function() {
      this.changeItem(-1);
    },

    next: function() {
      this.changeItem(1);
    },

    changeItem: function(num) {
      //1.移除定时器
      this.stopTimer();

      //2.修改index和位置
      this.currentIndex += num;
      this.scrollContent(-this.currentIndex * this.totalWidth);

      //3.添加定时器
      this.startTimer();
    }

  }
}
</script>




<style scoped>
  #hy-swiper {
    overflow: hidden;
    position: relative;
  }

  .swiper {
    display: flex;
  }

  .indicator {
    display:  flex;
    justify-content: center;
    position: absolute;
    widows: 100%;
    bottom: 8px;
  }

  .indi-item {
    box-sizing: border-box;
    widows: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }

  .indi-item.active {
    background-color: rgba(212,62,46,1.0);
  }
</style>