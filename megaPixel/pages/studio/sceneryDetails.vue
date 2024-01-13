<template>
  <view>
    <comm-navbar title="详情"/>
    <comm-empty/>

    <view style="background: #fff;position: fixed;width: 100vw;height: 45px;z-index: 10;">
      <view style="display: flex;flex-direction: row;align-items: center;height: 100%">
        <u-subsection mode="button" bgColor="#fff" activeColor="#faa1c7" fontSize="18" :list="list"
                      :current="curNow" @change="sectionChange"></u-subsection>
      </view>
    </view>

    <view style="padding-top: 45px">

      <view class="content-Box" style="padding: 5px 30px;z-index: 4;" v-show="curNow === 0">
        <view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 5px;padding: 5px 10px">
          <view style="font-weight: bold;color: #464646;letter-spacing: 0.05rem;font-size: 1rem;font-weight: bold">{{ goods.name }}</view>
          <view>
            <van-button v-if="hasAuth" size="small" style="z-index: 55" color="#ff8cad" type="primary" @click="goReservation">
              预 约
            </van-button>

            <van-button v-else  size="small" style="z-index: 55" color="#ff8cad"
                         type="primary" open-type='getPhoneNumber'
                         @getphonenumber="getPhoneNumber">
              预 约
            </van-button>
          </view>
        </view>
        <view
            class="def-font-spacing def-font-size"
            style="margin-bottom: 10px;background: #fff;padding: 10px 10px;"
              v-if="goods.intro !== null && goods.intro !== ''">


          <van-row  v-if="goods.price !== null && goods.price !== ''">
            <van-col span="6">
              <text class="d-m-title">单&thinsp; &thinsp;  &thinsp; 价：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value rmb-money">{{goods.price}}</text>
            </van-col>
          </van-row>

          <van-row  v-if="goods.area !== null && goods.area !== ''">
            <van-col span="6">
              <text class="d-m-title">面&thinsp; &thinsp;  &thinsp; 积：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.area}}</text>
            </van-col>
          </van-row>

          <van-row v-if="goods.style !== null && goods.style !== ''">
            <van-col span="6">
              <text class="d-m-title">风&thinsp; &thinsp;  &thinsp; 格：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.style}}</text>
            </van-col>
          </van-row>
          <van-row v-if="goods.capacity !== null && goods.capacity !== ''">
            <van-col span="6">
              <text class="d-m-title" > 人数上限：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.capacity}} 人</text>
            </van-col>
          </van-row>

          <van-row >
            <van-col span="6" style="background-color: #3c9cff">
              <view class="d-m-title">介&thinsp; &thinsp;  &thinsp; 绍：</view>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.intro}}</text>
            </van-col>
          </van-row>


          <van-row v-if="goods.detail !== null && goods.detail !== ''">
            <van-col span="6">
              <text class="d-m-title">须&thinsp;  &thinsp; &thinsp; 知：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.detail}}</text>
            </van-col>
          </van-row>

          <van-row v-if="goods.warning !== null && goods.warning !== ''">
            <van-col span="6">
              <text class="d-m-title">警&thinsp;  &thinsp; &thinsp; 告：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.warning}}</text>
            </van-col>
          </van-row>

          <van-row v-if="goods.startTime !== null && goods.startTime !== ''">
            <van-col span="6">
              <text class="d-m-title">开始时间：</text >
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.startTime}}</text>
            </van-col>
          </van-row>

          <van-row v-if="goods.endTime !== null && goods.endTime !== ''">
            <van-col span="6">
              <text class="d-m-title">结束时间：</text>
            </van-col>
            <van-col span="18">
              <text class="d-m-value">{{goods.endTime}}</text>
            </van-col>
          </van-row>


        </view>


        <view >
          <!-- 商品详情图片-->
          <image  mode="widthFix" style="width: 100%;margin-bottom: 15px" v-for="(item,index) in reality" @click="previewImg(item)"
                 :key="index" :src="item.sceneryPhoto.url"></image>
          <!-- 商品描述-->
<!--          <view class="def-font-spacing def-font-size" style=" margin-bottom: 20px;background: #fff;padding: 10px 10px;">-->
<!--&lt;!&ndash;            class="rmb-money"&ndash;&gt;-->
<!--            <van-row  v-if="goods.price !== null && goods.price !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">单&thinsp; &thinsp;  &thinsp; 价：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value rmb-money">{{goods.price}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--            <van-row  v-if="goods.area !== null && goods.area !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">面&thinsp; &thinsp;  &thinsp; 积：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.area}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--            <van-row v-if="goods.style !== null && goods.style !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">风&thinsp; &thinsp;  &thinsp; 格：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.style}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->
<!--            <van-row v-if="goods.capacity !== null && goods.capacity !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title" > 人数上限：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.capacity}} 人</text>-->
<!--              </van-col>-->
<!--            </van-row>-->


<!--            <van-row v-if="goods.detail !== null && goods.detail !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">须&thinsp;  &thinsp; &thinsp; 知：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.detail}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--            <van-row v-if="goods.warning !== null && goods.warning !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">警&thinsp;  &thinsp; &thinsp; 告：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.warning}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--            <van-row v-if="goods.startTime !== null && goods.startTime !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">开始时间：</text >-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.startTime}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--            <van-row v-if="goods.endTime !== null && goods.endTime !== ''">-->
<!--              <van-col span="6">-->
<!--                <text class="d-m-title">结束时间：</text>-->
<!--              </van-col>-->
<!--              <van-col span="18">-->
<!--                <text class="d-m-value">{{goods.endTime}}</text>-->
<!--              </van-col>-->
<!--            </van-row>-->

<!--&lt;!&ndash;            <view c v-if="goods.price !== null && goods.price !== ''"><text class="d-m-title">单&thinsp; &thinsp;  &thinsp; 价：</text><text class="d-m-value rmb-money">{{goods.price}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.area !== null && goods.area !== ''"><text class="d-m-title">面&thinsp; &thinsp;  &thinsp; 积：</text><text class="d-m-value">{{goods.area}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.style !== null && goods.style !== ''"><text class="d-m-title">风&thinsp; &thinsp;  &thinsp; 格：</text><text class="d-m-value">{{goods.style}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.capacity !== null && goods.capacity !== ''"><text class="d-m-title" > 人数上限：</text><text class="d-m-value">{{goods.capacity}} 人</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.detail !== null && goods.detail !== ''"><text class="d-m-title">介&thinsp; &thinsp;  &thinsp; 绍：</text><text class="d-m-value">{{goods.detail}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.warning !== null && goods.warning !== ''"><text class="d-m-title">须&thinsp;  &thinsp; &thinsp; 知：</text><text class="d-m-value">{{goods.warning}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.startTime !== null && goods.startTime !== ''"><text class="d-m-title">开始时间：</text ><text class="d-m-value">{{goods.startTime}}</text></view>&ndash;&gt;-->
<!--&lt;!&ndash;            <view v-if="goods.endTime !== null && goods.endTime !== ''"><text class="d-m-title">结束时间：</text><text class="d-m-value">{{goods.endTime}}</text></view>&ndash;&gt;-->
<!--          </view>-->

        </view>
      </view>
      <view v-show="curNow === 1" style="padding: 5px 30px;z-index: 4;">
        <view v-for="(item,index) in sample" :key="index"
              :style="{marginBottom: '15px',background: (item.detail !== null && item.detail !== '')?'#fff':''} ">
          <image style="width: 100%;" mode="widthFix" :src="item.sceneryPhoto.url" @click="previewImg(item)"/>
          <view v-if="item.detail !== null && item.detail !== ''"
                style="display: flex;justify-content: space-between;
                padding: 0px 15px;


            ">
            <view >
              <view class="def-font-size" style="color: #646566;padding-bottom: 3px">
                <text >
                {{ item.detail }}
                </text>
              </view>
            </view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>

import {getPhone,sceneryDetails} from '@/api/index'
import constant from '@/utils/constant'
import {getWechatAuth, getWechatUserInfo} from "@/utils/userAuth";
import auth from "../../mixins/auth";

export default {
  mixins: [auth],
  data() {
    return {
      contentTop: getApp().globalData.config.contentTop+45,
      sceneryId: null,
      info: {},
      goods: {},
      list: ['实景图', '样片'],
      curNow: 0,
      reality: [],
      sample:[],
      hasAuth: false
    }
  },
  // 分享功能
  onShareAppMessage() {
    const data = {
      studioId: this.studioId,
      title: this.title
    }

    return {
      title: this.goods.name,
      path: '/pages/studio/studio?data='+JSON.stringify(this.goods),
      imageUrl: this.reality[0].sceneryPhoto.url
    }
  },

  onLoad(e) {
    uni.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"]
    })
    this.hasAuth = uni.getStorageSync("hasAuth")
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#f8f8f8',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    uni.showShareMenu({
      withShareTicket: true,
      //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
      menus: ["shareAppMessage", "shareTimeline"]
    })

    const data = JSON.parse(e.data)
    this.sceneryId = data.id
    this.goods = data
    // console.log(this.goods)

    this.init()
  },
  methods: {
    getPhoneNumber(e) {

      const code = e.detail.code
      getPhone({code: code}).then(res => {
        const r = res.data
        if (r.errmsg === 'ok') {

          this.phone = r.phone_info['phoneNumber']
          uni.setStorageSync(constant.userPhone, this.phone)
          this.auth(true)
        } else {
          // this.$modal.msg("授权失败，请稍后再试")
        }
      }).catch(err => {
        this.tips = '授权失败，请稍联系管理员'
        this.$modal.msg("授权失败，请稍联系管理员")
      })
    },
    auth(isGo) {
      const _this_ = this
      getWechatAuth().then(authRes => {
        getWechatUserInfo().then(infoRes => {
          wx.login({
            success(res) {
              if (res.code) {
                const param = {
                  code: res.code,
                  phone: _this_.phone
                }
                _this_.$store.dispatch('AutoLogin', param).then(rs => {
                  if (rs) {
                    _this_.$store.dispatch('GetInfo')
                    uni.setStorageSync("start", false)
                    uni.setStorageSync("hasAuth", true)
                    _this_.hasAuth = true
                    if (isGo){
                      _this_.goReservation()
                    }
                  }

                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        })
      })
    },

    leftClick() {
      this.$tab.navigateBack()
    },
    init() {
      console.log(this.contentTop)
      sceneryDetails(this.sceneryId).then(res => {
        this.info = res

        let tempReality = []
        let tempSample = []
        this.info.sceneryPhotoRelations.forEach(item => {
          if (item.type === "1") {
            tempReality.push(item)
          } else {
            tempSample.push(item)
          }
        })

        this.reality = tempReality
        this.sample = tempSample
      })
    },
    previewImg(e){
      const photo = [e.sceneryPhoto.url];//将该图片放入一个数组中，每次点击时只查看一张
      wx.previewImage({
        current: photo,     //当前图片地址
        urls: photo,                 //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },

    sectionChange(index) {
      this.$nextTick(()=>{
        this.curNow = index;
      })
    },
    goReservation() {
      const param = {
        studioId: this.info.studioId,
        sceneryId: this.info.id,
        startTime: this.info.startTime,
        endTime: this.info.endTime,
        price: this.info.price,
        studioName: this.info.name,
        info: this.info,
        paymentQr: this.goods.paymentQr,
        phone: this.goods.phone,
        wechatId: this.goods.wechatId,
        wechatQr: this.goods.wechatQr
      }
      this.$tab.redirectTo('/pages/booking/booking?data=' + JSON.stringify(param))
    }
  }
}
</script>

<style scoped>
.content-Box{

}
.d-m-title{
  font-weight: bold;
  //width: 100px;
  ////display: inline-block;
  //display: flex;
  //justify-content: space-between;
}
.d-m-value{
  font-weight: bold;
  color: #3c9cff;
}
</style>
