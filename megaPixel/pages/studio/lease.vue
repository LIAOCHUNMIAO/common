<template>
	<view>
    <comm-navbar :title="title" :leftClick="leftClick"/>
    <comm-empty/>
<!--    <view>-->
<!--      <u-navbar @leftClick="leftClick" :title="title"></u-navbar>-->
<!--    </view>-->

    <view style="display: flex;">
      <!-- 左边菜单-->
      <view style="width: 100px;padding-left: 1px;">
        <view @click="change(index)" v-for="(item,index) in groupCategories"  :key="index" class="item-style" :style="{
            'borderLeft': index ===currentGroup? '3px solid #f67777': '3px solid transparent',
            'background': index ===currentGroup? '#ffffff': '',

          }">
          <view style="margin-left: 5px">{{item.name}}</view>
        </view>
      </view>
      <!-- 右边商品分类列表-->
      <view style="flex-grow: 1;background: white;padding: 2px 15px;height: 86vh;overflow-y: scroll">
        <!--            {{currentGroup}}-->
        <view v-for="(item,index) in groupCategories[currentGroup].categories" :key="index" style="margin-bottom: 40px">
          <view style="font-weight: bold;margin: 10px">{{item.name}}</view>
          <view  v-for="(t,i) in item.rentalItems" :key="i" class="flex-between" style="border-bottom: 1px solid #e7e7e7;
          padding-bottom: 10px">
            <image style="width: 80px;height: 80px;border-radius: 8px" :src="t.img"></image>
            <view style="display: flex;flex-direction: column;align-items: start;justify-content: space-around;
            flex-grow: 1;margin-left: 20px">
              <view style="font-weight: bold;">{{t.name}}</view>
              <view style="color: #a7d2ff;">{{t.price}}/次</view>
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
	import {rental} from "@/api/index";
  import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";

  export default {
    components: {CommNavbar},
		data() {
			return {
        queryParams: {
          value: null
        },
        currentGroup: 0,
        groupCategories:[],
        studioId: null,
        title: null,
        paymentQr: null,
        phone: null,
        wechatId: null,
        wechatQr: null,
        currentTab: 'studioLease',
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
        path: '/pages/studio/lease?data='+JSON.stringify(data),
        // imageUrl: this.coverList[0].url
      }
    },
    onLoad(e) {
      uni.showShareMenu({
        withShareTicket: true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus: ["shareAppMessage", "shareTimeline"]
      })
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
      init(){
        rental(this.studioId).then(res =>{
          this.groupCategories = res
        })
      },
      leftClick() {
        this.$tab.navigateBack()
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
      change(e) {
        this.currentGroup = e
      }
		}
	}
</script>

<style>

</style>
