<template>
<view class="main" :style="{background: bgColor,paddingTop: navTop + 'px', height: navHeight + 'px'}">
  <view class="box" :style="{background: bgColor,height: navHeight + 'px'}">
    <view style="margin-left: 2px;" @click="goBack()">
      <view style="font-size: 22px;color: #ffffff" class="mega-pixel-icon icon-left"></view>
    </view>
    <view style="flex-grow: 1">
      <view class="flex-center" style="padding-right: 24px">
        <text :style="{color: titleColor,fontSize: lenCross?'15px':'19px'}" class="title">{{title}}</text>
      </view>
    </view>
  </view>
</view>
</template>

<script >
export default {
    props:{
      title:{
        type: String,
        default: ''
      },
      titleColor:{
        type: String,
        default: '#ffffff'
      },
      bgColor:{
        type: String,
        default: '#faa1c7'
      },
      leftClick:{
        type: Function,
        default: function () {
          uni.navigateBack()
        }
      }
    },
  watch:{
      title:{
        immediate: true,
        deep: true,
          handler(newVal) {
          if (newVal === null || newVal === '' || newVal === undefined) return
            console.log(newVal)
            if (newVal.length >13){
                this.lenCross = true
            }
          }
      }
  },
    data() {
      return {
        navHeight: getApp().globalData.config.navHeight,
        navTop:  getApp().globalData.config.navTop,
        lenCross: false
      }
    },
    created() {
    },
    methods: {
      goBack(){
        uni.navigateBack()
      }
    }
  }
</script>



<style scoped lang="scss">
.main{
  position: fixed;top: 0;left: 0;z-index: 999
}
.box{
  display: flex;
  //padding-top: 50px;
  width: 100vw;
  align-items: center;
  height: 90px
}
.title{
  font-size: 19px;
  font-weight: bold;
}

</style>