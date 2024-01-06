<template>
<view class="main" :style="{background: bgColor,paddingTop: navTop + 'px', height: navHeight + 'px'}">
  <view class="box" :style="{background: bgColor,height: navHeight + 'px'}">
    <view style="margin:0px 4px;" @click="goBack()">
      <view :style="{ fontSize: isTop?'20px':'19px',color: titleColor}" class="mega-pixel-icon icon-left"></view>
    </view>
    <view style="flex-grow: 1">
      <view  style="padding-right: 24px;" :class="[isTop? 'flex-center':'']" >
        <text :style="{color: titleColor,fontSize: isTop?'19px':'16px',fontWeight: isTop?'bold':''}" class="title">{{title}}</text>
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
        default: '#5B5B5B'
      },
      bgColor:{
        type: String,
        default: '#f8f8f8'
      },
      autoBack:{
        type: Boolean,
        default: true
      },
      isTop:{
        type: Boolean,
        default: false
      },
      // leftClick:{
      //   type: Function,
      //   default: null
      // }
      leftClick: Function
    },
  watch:{
      title:{
        immediate: true,
        deep: true,
          handler(newVal) {
          if (newVal === null || newVal === '' || newVal === undefined) return
            // console.log(newVal)
            if (newVal.length >13){
                this.lenCross = true
            }
          }
      }
  },
  // onReady() {
  //   //动态修改状态栏的颜色
  //   uni.setNavigationBarColor({
  //     frontColor: this.isTop? '#fff': '#000'
  //   })
  // },
    data() {
      return {
        navHeight: getApp().globalData.config.navHeight,
        navTop:  getApp().globalData.config.navTop,
        lenCross: false
      }
    },
    onLoad(){

    },
    created() {

      // wx.setNavigationBarColor({
      //   fontColor: this.isTop ? 'white': 'black',
      //   backgroundColor: '#000000',
      // })
    },
    methods: {
      goBack(){
          if (this.autoBack){
            uni.navigateBack()
          }else {
            if (this.$parent.goBack() !== undefined) {
              // 调用父组件方法
              this.$parent.goBack()
            }
          }
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
  font-size: 16px;
  //font-weight: bold;
}

</style>