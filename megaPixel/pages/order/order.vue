<template>
	<view >
    <comm-navbar title="订单"  :auto-back="false"/>
    <comm-empty/>
    <view>

		<view class="m-tabs" >
			<view style="display: flex;justify-content: center;background: white; ">
				<u-tabs :list="tabList" @change="tabChange" lineWidth="30" lineColor="#faa1c7" :activeStyle="{
				            color: '#faa1c7',
				            fontWeight: 'bold',
				            transform: 'scale(1.05)'
				        }" :inactiveStyle="{
				            color: '#606266',
				            transform: 'scale(1)'
				        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
				</u-tabs>
			</view>
		</view>
		<view class="m-tabs-item" >
			<order-store v-if="currentCom === 'store'"></order-store>
			<order-store-meet v-else-if="currentCom === 'storeMeet'"></order-store-meet>
			<order-lease v-else-if="currentCom === 'lease'"></order-lease>
			<order-exhibition v-else-if="currentCom === 'exhibition'"></order-exhibition>
			<order-shopping-mall v-else-if="currentCom === 'shoppingMall'"></order-shopping-mall>
		</view>
    </view>
	</view>
</template>

<script>
	import orderStore from './module/order-store.vue'
	import orderStoreMeet from './module/order-store-meet.vue'
	import orderLease from '../order/module/order-lease.vue'
	import orderExhibition from '../order/module/order-exhibition.vue'
	import orderShoppingMall from '../order/module/order-shopping-mall.vue'

	import {
		systemInfo
	} from '@/utils/myUtils.js'
	export default {
		components: {
			orderStore,
			orderStoreMeet,
			orderLease,
			orderExhibition,
			orderShoppingMall
		},
		data() {
			return {
				keyword: '',
				currentCom: 'store',
        tabList: [{
					name: '摄影棚',
					key: 'store',
          disabled: false
				}, {
					name: '摄影会',
					key: 'storeMeet',
          disabled: true
				}, {
					name: '租赁',
					key: 'lease',
          disabled: true
				}, {
					name: '展会',
					key: 'exhibition',
          disabled: true
				}, {
					name: '商城',
					key: 'shoppingMall',
          disabled: true
				}],
				vxNavHeight: 44,
				vxItemHeight: 68,
        back: {
          page: "",
          studioId: "",
          title: "",
        },
        startX: 0,
        startY: 0,
        moveX: 0,
        moveY: 0,
        cdIndex: null
      }
		},
    onLoad: function (e) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#f8f8f8',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      if (this.$utils.isNotNull(e)) {

        getCurrentPages().forEach((item, index) => {
          if (item.route === 'pages/studio/booking') {
            this.cdIndex = index
          }
        })
        const data = JSON.parse(e.data)
        this.back = data
      }
    },
		created() {

			/*#ifdef MP-WEIXIN*/
			const v = getApp().globalData.config.systemInfo
			const h = parseFloat(v.navHeight + v.statusBarHeight).toFixed(0)
			this.vxNavHeight = h
			this.vxItemHeight = Number(this.vxItemHeight) + Number(h) + Number(20)

			/*#endif*/

			/*#ifdef H5*/
			this.vxNavHeight = this.vxNavHeight *2 - 2
			this.vxItemHeight = this.vxItemHeight *2 + + Number(30)
			/*#endif*/
		},
		// onBackPress({from}) {
    //   console.log(from)
		// 	if (from === 'backbutton'){
    //     console.log( 1111)
    //   }else {
    //     console.log(2222)
    //   }
    //   return true
		// },
    onUnload() {
      this.goBack()

    },

		methods: {
      goBack() {
        console.log(this.cdIndex)
        if (this.back.page === '' || this.back.page === undefined || this.back.page === null){
          uni.navigateBack()
        }else {
          uni.navigateBack({
            delta: this.cdIndex
          });
        }
      },

			change(e) {
				console.log(e)
			},
			tabChange(e) {
				console.log(e)
        if (e.key !== 'store') {
          this.$modal.msg("该模块还未开放！请稍后")
        }
        this.currentCom = 'store'
				// this.currentCom = e.key
			},
			search() {
				console.log(6)
			}
		}
	}
</script>

<style>
	.m-tabs {
		z-index: 99;
		width: 100%;
		position: fixed;
    padding: 5px 0px;
    background: #fff;
	}

	.m-tabs-item {
    padding: 40px 5px 5px 5px;
	}
</style>