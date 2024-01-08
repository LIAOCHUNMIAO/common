<template>
	<view>
    <comm-navbar title="会员"/>
    <comm-empty/>

    <view>
		<view  class="vip-card" v-for="(item,index) in vipList" :key="index" @click="sikp(item)">
      <image class="bj-style" :src="vipBj"></image>
			<view class="card-top">
				<view>
					<image style="width: 90px;height: 90px;margin-right: 10px;border-radius: 10px;"
                 :src="item.studio.backgroundPhoto+''" alt=""/>
				</view>
				<view style="font-size: 18px;margin-top: 7px;">{{item.studio.name}}</view>
				<view>
          <view style="height: 20px;width: 20px;margin-top: 12px;color: #858585" class="mega-pixel-icon icon-right"></view>
				</view>
			</view>
			<view class="card-bottom">
				<view class="botm-item">
					<view >余额</view>
					<view>{{item.balance}}</view>
				</view>
				<view class="botm-item">
					<view>卡项</view>
					<view>
            0
<!--            {{item.card}}-->
          </view>
				</view>
				<view class="botm-item">
					<view>积分</view>
					<view>{{item.integration}}</view>
				</view>
				<view class="botm-item">
					<view>优惠劵</view>
					<view>
            0
<!--            {{item.coupon}}-->
          </view>
				</view>
			</view>
    </view>
		</view>
	</view>
</template>

<script>
import {allMembership} from '@/api/index'
import MTabbarNavbar from "../../components/m-tabbar-navbar/m-tabbar-navbar.vue";
	export default {
    components: {MTabbarNavbar},
		data() {
			return {
        vipBj: require('@/static/images/myVip/bj.png'),
				vipList: []
			}
		},
    onLoad() {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#f8f8f8',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
      this.init()
    },
		methods: {
      init(){
        allMembership().then(res =>{
          this.vipList = res
        })
      },
			sikp(item) {

        const data = {
          studioId: item.studioId,
          title: item.studio.name
        }
				this.$tab.navigateTo('/pages/studio/studio?data='+JSON.stringify(data))
			}
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
	.vip-card {
    position: relative;
    z-index: 1;
		//background: #dbe9ea;

		margin: 10px;
		padding-top: 5px;
		/* padding: 5px; */
		border-radius: 10px;
    overflow: hidden;
	}

	.card-top {
		display: flex;
		margin: 10px;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
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
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
    //justify-content: space-between;
	}

	.botm-item> view {
		margin: 5px;
	}
</style>