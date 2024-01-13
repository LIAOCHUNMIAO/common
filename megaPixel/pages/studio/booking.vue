<template>
	<view>
    <comm-navbar :title="title" :leftClick="leftClick"/>
    <comm-empty/>
<!--    <view>-->
<!--      <u-navbar @leftClick="leftClick" :title="title"></u-navbar>-->
<!--    </view>-->
    <view>
<!--      <u-subsection mode="button" bgColor="#fff" activeColor="#faa1c7" fontSize="16" :list="list"-->
<!--                    :current="curNow" @change="sectionChange"></u-subsection>-->
<!--    </view>-->

      <view style="">
        <!-- 摄影棚-->
        <view v-if="curNow === 0" style="padding: 5px 30px">
          <!-- 预约商品列表-->
          <view v-for="(item,index) in studioList" :key="index"

                style="z-index: 50;background: #fff;border-radius: 0px 0px 5px 5px;margin-bottom: 15px">
            <image  @click="goDetails(item)"  style="width: 100%;" mode="widthFix" :src="item.sceneryPhotoRelations[0].sceneryPhoto.url"></image>
            <view   style="padding: 15px 15px">
              <view @click="goDetails(item)" style="display: flex;justify-content: space-between;align-items: center">
                <view class="" style="margin-bottom: 5px; letter-spacing: 0.05rem;font-size: 1rem;font-weight: bold">{{ item.name }}</view>
                <view  class="rmb-money flex-center"

                       style="margin-bottom: 5px;color: #48b0d0;width: 80px;letter-spacing: 0.05rem;font-size: 1rem;">
                  {{ item.price }}/h</view>
              </view>
              <view style="display: flex;justify-content: space-between;align-items: center;">
                <view  @click="goDetails(item)" class="def-font-size"  style="color: #646566">{{ subValue(item.intro) }}</view>

                <view style="width: 80px;z-index: 55" class="flex-center">
                  <button
                      v-if="hasAuth"
                      @click.stop="goBooking(item)"
                      class="auth-button"
                      style="
                      width: 80px;
                display: flex;
                align-items: center;
                height: 30px;
                background-color: transparent;"
                  >
                  <text style="z-index: 59;padding: 7px 12px;font-size: 12px;color: #fff" class="my-bj-topic-color">预  约</text>
                  </button>
                  <button
                      v-else
                      class="auth-button"
                      style="
                      z-index: 88;
                      width: 80px;
                      display: flex;
                      align-items: center;
                      height: 30px;
                      background-color: transparent;"
                      open-type='getPhoneNumber'  @getphonenumber="getPhoneNumber($event,item)"
                  >
                    <text style="z-index: 59;padding: 7px 12px;font-size: 12px;color: #fff" class="my-bj-topic-color">预  约</text>
                  </button>
                </view>
              </view>
            </view>

          </view>
        </view>


      </view>
    </view>
    <!-- 底部菜单栏-->
    <u-tabbar z-index="888"   activeColor="#ff8cad" :value="currentTab" @change="changeTab()" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item :name="item.name" :text="item.text" v-for="(item,index) in tabList" :key="index">
        <view slot="active-icon" style="font-size: 18px" :class="['mega-pixel-icon','my-topic-color',item.icon]"></view>
        <view slot="inactive-icon" style="font-size: 18px;color: #8f8f8f" :class="['mega-pixel-icon',item.icon]"></view>
      </u-tabbar-item>
    </u-tabbar>

	</view>
</template>

<script>
import {getPhone,allScenery} from '@/api/index'
import constant from '@/utils/constant'
import {getWechatAuth, getWechatUserInfo} from "@/utils/userAuth";
import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";
	export default {
    components: {CommNavbar},
		data() {
			return {
        list: ['摄影棚', '其他服务'],
        curNow: 0,
        studioList: [],
        radios:[
          {
            name: '全部',
            key: 'all',
            checked: true
          },
          {
            name: '摄影师',
            key: 'cameraman',
            checked: false
          },
          {
            name: '化妆',
            key: 'Makeup',
            checked: false
          },
          {
            name: '服务',
            key: 'service',
            checked: false
          }
        ],
        studioId: null,
        title: null,
        paymentQr: null,
        phone: null,
        wechatId: null,
        wechatQr: null,
        currentTab: 'studioBooking',
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
        hasAuth: false
			}
		},
    onShareAppMessage() {
        const data = {
          studioId: this.studioId,
          title: this.title,
          paymentQr: this.paymentQr,
          phone: this.phone,
          wechatId: this.wechatId,
          wechatQr: this.wechatQr
        }
      return {
        title: this.title,
        path: '/pages/studio/booking?data='+JSON.stringify(data),
        // imageUrl: this.coverList[0].url
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
      const data =  JSON.parse(e.data)
      this.studioId = data.studioId
      this.title = data.title
      this.paymentQr=data.paymentQr
      this.phone=data.phone
      this.wechatId=data.wechatId
      this.wechatQr=data.wechatQr
      this.init()
    },
		methods: {
      subValue(v){
          if (v.length> 30){
            return v.substring(0,30)+'...'
          }
        return v
      },
      getPhoneNumber(e,item) {

        const code = e.detail.code
        getPhone({code: code}).then(res => {
          const r = res.data
          if (r.errmsg === 'ok') {

            this.phone = r.phone_info['phoneNumber']
            uni.setStorageSync(constant.userPhone, this.phone)
            this.auth(true,item)
          } else {
            // this.$modal.msg("授权失败，请稍后再试")
          }
        }).catch(err => {
          this.tips = '授权失败，请稍联系管理员'
          this.$modal.msg("授权失败，请稍联系管理员")
        })
      },
      auth(isGo,row) {
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
                        _this_.goDetails(row)
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





      init(){
        allScenery(this.studioId).then(res =>{
          this.studioList = res
        })
      },
      changeTab(e) {
        if (e === this.currentTab) return
        for (const i of this.tabList){
          if (i.name === e) {
            const data = {
              studioId: this.studioId,
              title: this.title,
              paymentQr: this.paymentQr,
              phone: this.phone,
              wechatId: this.wechatId,
              wechatQr: this.wechatQr
            }
            const url = i.page+'?data='+JSON.stringify(data)
            this.$tab.redirectTo(url)
            break
          }
        }
      },
      leftClick() {
        this.$tab.navigateBack()
      },
      sectionChange(index) {
        this.curNow = index;
      },
      goBooking(item){
        const param = {
          studioId: item.studioId,
          sceneryId: item.id,
          startTime:item.startTime,
          endTime:item.endTime,
          price: item.price,
          studioName: item.name,
          info: item,
          paymentQr: this.paymentQr,
          phone: this.phone,
          wechatId: this.wechatId,
          wechatQr: this.wechatQr
        }
        this.$tab.navigateTo('/pages/booking/booking?data='+JSON.stringify(param))
      },
      goDetails(item) {
        item['paymentQr'] = this.paymentQr
        item['phone'] = this.phone
        item['wechatId'] = this.wechatId
        item['wechatQr'] = this.wechatQr
        this.$tab.navigateTo('/pages/studio/sceneryDetails?data='+JSON.stringify(item))
      },
      radioClick(i) {
        this.radios.map((item, index) => {
          item.checked = index === i
        })
      },
		}
	}
</script>

<style scoped>

</style>
