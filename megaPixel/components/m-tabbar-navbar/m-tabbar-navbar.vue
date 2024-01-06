<template>
  <view class="main" :style="{paddingTop: navTop + 'px', height: navHeight + 'px'}">

      <view class="flex-center box" :style="{height: navHeight + 'px'}">
        <text class="title">{{ title }}</text>
    </view>
  </view>

</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      config: getApp().globalData.config,
      navHeight: getApp().globalData.config.navHeight,
      navTop: getApp().globalData.config.navTop
    }
  }
}
</script>

<style scoped>
.main {
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #ff8cad;
}

.box {
  background: #ff8cad;
}

.title {
  color: #fff;
  font-size: 19px;
  font-weight: bold;
}
</style>