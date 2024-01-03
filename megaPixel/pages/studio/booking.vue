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
        <view v-if="curNow === 0" style="padding: 5px 20px">
          <!-- 预约商品列表-->
          <view v-for="(item,index) in studioList" :key="index" style="z-index: 50;background: #fff;border-radius: 0px 0px 5px 5px;margin-bottom: 10px">
            <image  @click="goDetails(item)" style="width: 100%;" mode="widthFix" :src="item.sceneryPhotoRelations[0].sceneryPhoto.url"></image>
            <view style="padding: 15px 15px">
              <view style="display: flex;justify-content: space-between;align-items: center">
                <view class="title-font-size" style="margin-bottom: 10px">{{ item.name }}</view>
                <view  class="rmb-money flex-center def-font-size" style="margin-bottom: 10px;color: #48b0d0;width: 80px">{{ item.price }}/h</view>
              </view>
              <view style="display: flex;justify-content: space-between;align-items: center;">
                <view class="def-font-size">{{ item.intro }}</view>

                <view style="width: 80px" class="flex-center">
                  <van-button  style="z-index: 55" color="#faa1c7" type="primary" @click.stop="goBooking(item)" size="small">预  约</van-button>
<!--                  <view class="my-submit-button" @click.stop="goBooking(item)" style="z-index: 55">-->
<!--                    预  约-->
<!--                  </view>-->
                </view>
              </view>
            </view>

          </view>
        </view>


      </view>
    </view>
    <!-- 底部菜单栏-->
    <u-tabbar z-index="888"   activeColor="#faa1c7" :value="currentTab" @change="changeTab()" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
      <u-tabbar-item :name="item.name" :text="item.text" v-for="(item,index) in tabList" :key="index">
        <view slot="active-icon" style="font-size: 18px" :class="['mega-pixel-icon','my-topic-color',item.icon]"></view>
        <view slot="inactive-icon" style="font-size: 18px;color: #8f8f8f" :class="['mega-pixel-icon',item.icon]"></view>
      </u-tabbar-item>
    </u-tabbar>

	</view>
</template>

<script>
import {allScenery} from "@/api/index";
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
          {
            text: '会员',
            name: 'studioVip',
            icon: 'icon-vip',
            page: '/pages/studio/vip'
          },
        ],
			}
		},
    onLoad(e) {
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
