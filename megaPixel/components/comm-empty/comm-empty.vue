<template>
  <view :style="{height: contentTop + 'px'}">
  </view>
</template>
<script>

export default {
  name: 'comm-empty',
  data() {
    return {
      contentTop: getApp().globalData.config.contentTop,
    }
  }
}
</script>


<style scoped lang="scss">

</style>