<template>
  <view>
    <comm-navbar :title="title"/>
    <comm-empty/>
    <view style="position: relative">

      <view style="height: auto">
        <u-swiper :list="coverList" height='250' key="url" @click="showImg"></u-swiper>


        <view class="dynamicBox" :style="{height: defHeight}">

          <view style="position: absolute;top: -65px;height: auto;width: 100vw;">
            <!--           130px 头像-->
            <view style="position: absolute;top: -40px;height: 80px;width: 100vw;">

              <view class="flex-center" style="width: 100%;height: 100%;">
                <view style="width: 80px;height: 80px;background-color: #ffd849;border-radius:50%;overflow: hidden">
                  <image style="width: 100%;height: 100%"
                         :src="studioInfo.studio.avatar2.url">
                  </image>
                </view>
              </view>
            </view>

            <view style="margin: 0 50px;background: #ffffff;
            height: 100%; border-radius: 10px;box-shadow: 0px 5px 15px 0px #efefef;">
              <view style="padding-top: 40px">
                <view class="flex-center" style="padding: 0px 10px">
                  <view  class="studio-name def-font-spacing">{{ studioInfo.studio.name }}</view>
                </view>
                <view  style="margin: 0px 10px">
                  <view style="display: flex;align-items: center;padding: 10px;">
                    <view style="height: 24px;width: 24px;padding-top: 2px;color: #ababab"
                          class="mega-pixel-icon icon-home"></view>
                    <view
                        ref="box"
                        id="box"
                          style="padding: 4px 15px;flex-grow: 1;color: #646566;
                          letter-spacing: 0.05rem;
                          font-size: 12px;
">
                      {{ studioInfo.studio.intro }}</view>
                  </view>
                </view>
              </view>
            </view>

          </view>

          <view style="position: absolute;bottom: 0">


            <view
                style="display: flex;height: 65px;align-items: center;justify-content: center;width: 100vw;padding: 0px 50px">

              <view @click.native="toMap"
                    style="font-size: 20px;padding-top: 2px;color: #ababab"
                    class="mega-pixel-icon icon-position"/>

              <view style="flex-grow: 1;padding: 0px 10px;word-wrap:break-word;word-break:break-all;">
                <text  style="color: #646566;
                letter-spacing: 0.05rem;
                          font-size: 12px;">{{ studioInfo.studio.address }}</text>
              </view>
              <view style="width: 66px;display: flex">
                <!-- 复制微信号-->
                <view style="flex-shrink: 0;margin-right: 15px;">
                  <text @click.native="copy" style="color: #27b73f;font-size: 24px;"
                        class="mega-pixel-icon icon-vx"></text>
                </view>
                <!-- 获取电话-->
                <view @click.native="callPhone" style="font-size: 24px;flex-shrink: 0;margin-right: 10px;"
                      class="mega-pixel-icon icon-telephone my-topic-color"/>
              </view>
            </view>

          </view>

        </view>
      </view>

      <view>

      </view>


      <view>
        <view class="flex-center">
          <text class="def-font-spacing" style="font-size: 22px;margin: 10px 0px">摄影棚公告</text>
        </view>
        <!-- 使用须知图片-->
        <image  @click.native="previewImg(studioInfo.studio.backgroundPhoto2.url)" mode="widthFix" style="width: 100%" :src="studioInfo.studio.backgroundPhoto2.url"/>
      </view>
    </view>
    <!-- 底部菜单栏-->
    <u-tabbar z-index="888" activeColor="#ff8cad" :value="currentTab" @change="changeTab()" :fixed="true"
              :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item :name="item.name" :text="item.text" v-for="(item,index) in tabList" :key="index">
        <view slot="active-icon" style="font-size: 18px" :class="['mega-pixel-icon','my-topic-color',item.icon]"></view>
        <view slot="inactive-icon" style="font-size: 18px;color: #8f8f8f" :class="['mega-pixel-icon',item.icon]"></view>
      </u-tabbar-item>
    </u-tabbar>

  </view>
</template>

<script>
import {studio} from "@/api/index";
import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";

export default {
  components: {CommNavbar},
  data() {
    return {
      contentTop: getApp().globalData.config.contentTop,
      studioInfo: {},
      studioId: null,
      title: null,
      paymentQr: null,
      phone: null,
      wechatId: null,
      wechatQr: null,
      coverList:[],
      currentTab: 'studioHome',
      tabList: [{
        text: '首页',
        name: 'studioHome',
        icon: 'icon-home',
        page: '/pages/studio/studio'
      },
        {
          text: '预约',
          name: 'studioBooking',
          icon: 'icon-browser',
          page: '/pages/studio/booking'
        },
        {
          text: '租赁',
          name: 'studioLease',
          icon: 'icon-lease',
          page: '/pages/studio/lease'
        },
        // {
        //   text: '会员',
        //   name: 'studioVip',
        //   icon: 'icon-vip',
        //   page: '/pages/studio/vip'
        // },
      ],
      defHeight: '130px'
    }
  },
  onLoad(e) {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    const data = JSON.parse(e.data)

    this.studioId = data.studioId
    this.title = data.title
    this.init()
  },
  // 分享功能
  onShareAppMessage() {
    const data = {
      studioId: this.studioId,
      title: this.title
    }

    return {
      title: this.studioInfo.studio.name,
      path: '/pages/studio/studio?data='+JSON.stringify(data),
      imageUrl: this.coverList[0].url
    }
  },

  methods: {
    init() {
      if (this.studioId === '') {
        return
      }
      studio(this.studioId).then(res => {
        // console.log(res)
        this.studioInfo = res
        this.title=this.studioInfo.studio.name


        this.coverList = res.coverList


        this.calculateHeight()
        // this.paymentQr = this.studioInfo.studio.paymentQr2.url
        this.phone = this.studioInfo.studio.phone
        this.wechatId = this.studioInfo.studio.wechatId
        this.wechatQr = this.studioInfo.studio.wechatQr2.url

        const p = {
          studioWechatId: this.studioInfo.studio.wechatId,
          studioPhone: this.studioInfo.studio.phone,
          studioId: this.studioId,
          studioName: this.title
        }
        this.$store.dispatch('StudioInfo', p)
      })
    },
    leftClick() {
      uni.navigateBack()
    },
    showImg(e) {
      if (this.coverList !== null && this.coverList.length > 0){
        const photo = [this.coverList[e].url];//将该图片放入一个数组中，每次点击时只查看一张
        wx.previewImage({
          current: photo,     //当前图片地址
          urls: photo,                 //所有要预览的图片的地址集合 数组形式
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }
    },
    previewImg(url){
      const photo = [url];//将该图片放入一个数组中，每次点击时只查看一张
      wx.previewImage({
        current: photo,     //当前图片地址
        urls: photo,                 //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },
    changeTab(e) {
      if (e === this.currentTab) return
      for (const i of this.tabList) {
        if (i.name === e) {
          const data = {
            studioId: this.studioId,
            title: this.title,
            paymentQr: this.paymentQr,
            phone: this.phone,
            wechatId: this.wechatId,
            wechatQr: this.wechatQr
          }
          const url = i.page + '?data=' + JSON.stringify(data)
          this.$tab.redirectTo(url)
          break
        }
      }
    },
    callPhone() {
      uni.makePhoneCall({
        phoneNumber: this.phone,//电话号码
        success: function (e) {
        },
        fail: function (e) {
        }
      })
    },
    copy() {
      uni.setClipboardData({
        data: this.wechatId,
        success: () => {
          this.$modal.msg("复制成功！")
        }
      })
    },
    toMap() {
      this.$tab.navigateTo('/pages/plat/plat')
    },
    // 计算盒子高度
    calculateHeight(){
      let defh = 125;
      const t = 10; // 标题一行长度
      const d = 16; // intro一行长度
      const nl =  this.studioInfo.studio.name.length
      const titleNameSize = 20
      const introSize = 13
      let l =  nl/t;

      if (l >1){
        const l1 =  nl%t;
        if (l1 !== 0){
          // 算出行数
          l = parseInt(l)
          defh = defh+(l*titleNameSize)
        }else {
          defh = defh+(l*titleNameSize)-titleNameSize
        }
      }

      const dl = this.studioInfo.studio.intro.length
      let w =  dl/d;
      console.log(w)
      if (w >1){
        const wy =  dl%d;
        console.log(wy)
        if (wy !== 0){
          // 算出行数
          w = parseInt(w)

          const ff = w%2;
          console.log(ff)

          defh = defh+(w*introSize)
        }else {
          defh = defh+(w*introSize)-introSize
        }
      }
      this.defHeight = defh+'px'
    }
  }
}
</script>

<style scoped lang="scss">
.m {
  height: 60px;
  width: 100%;
  background: #ffffff;
  position: absolute;
  left: 0;
  z-index: 9;
  margin: 0px 40px;
}

//page {
//  height: 100%;
//  //background-color: white;
//}

.m-linear {
  //box-shadow: 0px 5px 15px 0px #cacaca;
  z-index: 6;
  height: 120px;
  width: 100%;
  background-image: linear-gradient(to bottom, transparent, #fff 10%, #fff 20%, #fff 100%);
  position: absolute;
  transform: translateY(-50px);
  //padding-top: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
}

.details-card {
  background-color: white;
  border-radius: 10px;
  //height: 150px;
  padding-top: 40px;
  box-shadow: 0px 5px 15px 0px #efefef;


}

.dynamicBox{
  width:100vw;background: #ffffff;position: relative;
}

.studio-name {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-top: 5px;
}
</style>
