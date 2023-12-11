<template>
<view>
  <comm-navbar :title="title" :leftClick="leftClick"/>
  <comm-empty/>
  <view style="padding: 20px;" >
    <view style="height: 200px;background: #ffe6fd;border-radius: 15px;position: relative;z-index: 2;overflow: hidden">
      <image class="bj-style" :src="vipBj"></image>
      <view style="display: flex;padding: 10px;align-items: center">
        <view>
          <image style="height: 60px;width:  60px;border-radius: 50%" src="@/static/images/tctest.png"></image>
        </view>
        <view  style="display: flex;flex-grow: 1;flex-direction: column;margin:0px 15px" >
          <view style="display: flex;justify-content: space-between;width: 100%;padding-top: 20px;">
            <view style="font-size: 17px;font-weight: bold">
              微信用户
            </view>
            <view>
              <view style="display: flex;align-items: center;justify-content: end">
                会员攻略
                <view style="height: 15px;width: 15px;color: #858585" class="mega-pixel-icon icon-right"></view>
              </view>
              <view></view>
              <!--              <view style="margin: 10px 0px;color: #9b9b9b;font-size: 10px">-->
              <!--                {{info.currentExp}} / {{info.maxExp}}-->
              <!--              </view>-->
            </view>
          </view>
          <view>
            <view style="height: 50px"></view>
            <!--            <view>-->
            <!--              <u-line-progress height="6" :percentage="(info.currentExp/info.maxExp)*100" :showText="false"></u-line-progress>-->
            <!--            </view>-->
            <!--            <view style="display: flex;flex-direction: row;justify-content: space-between;-->
            <!--            font-size: 10px;color: #9b9b9b">-->
            <!--              <text style="flex-grow: 1" v-for="(item,index) in vipLv">{{item}}</text>-->
            <!--              <text style="flex-grow: 1"> </text>-->
            <!--            </view>-->
          </view>


        </view>
      </view>
      <view class="card-bottom">
        <view class="botm-item">
          <view>余额</view>
          <view>{{info.discount}}</view>
        </view>
        <view class="botm-item">
          <view>卡项</view>
          <view>
            0
            <!--            {{info.card}}-->
          </view>
        </view>
        <view class="botm-item">
          <view>积分</view>
          <view>0</view>
        </view>
        <view class="botm-item">
          <view>优惠劵</view>
          <view>
            0
            <!--            {{info.coupon}}-->
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
	import {membershipByStudioId} from "../../api/index";
  import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";

  export default {
    components: {CommNavbar},
		data() {
			return {
        vipBj: require('@/static/images/myVip/bj.png'),
        vipLv:[
          'v0',
          'v1',
          'v2',
          'v3',
          'v4',
          'v5',
          'v6',
          'v7'
        ],
        info:{
          id: 1,
          name: 'XX摄影棚',
          discount: '0',
          card: 1,
          integral: 22,
          coupon: 2,
          maxExp: 20000,
          currentExp: 15432,
        },
        studioId: null,
        title: null,
        paymentQr: null,
        phone: null,
        wechatId: null,
        wechatQr: null,
        currentTab: 'studioVip',
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
      console.log(e)
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
        membershipByStudioId(this.studioId).then(res=>{
          this.info.discount = res.discount
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
		}
	}
</script>

<style>
.bj-style{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.card-bottom {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px;
  padding: 15px 0px;
}

.botm-item {
  color: #818181;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.botm-item> view {
  margin: 5px;
}
</style>
