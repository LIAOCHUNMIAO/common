<template>
	<view>
    <m-tabbar-navbar title="个人中心"/>
    <comm-empty/>
		<view class="my-bj-topic-color" style="height: 70px;display: flex;align-items: center;padding: 0px 10px;">
      <!-- 头像 -->
      <u-avatar size="55" :src="userInfo.avatarUrl"></u-avatar>
      <!-- 昵称 -->
			<view style="margin-left: 10px;color: white;font-size: 1.2rem;font-weight: bold">{{userInfo.nickName}}</view>
      <!-- 编辑 -->
<!--			<view style="margin-left: 20px;display: flex;" @click="editUser()">-->
<!--				<view >-->
<!--          <view style="font-size: 16px;padding-top: 2px;color: #8f8f8f" class="mega-pixel-icon icon-pen"></view>-->
<!--        </view>-->
<!--				<view>-->
<!--					修改-->
<!--				</view>-->
<!--			</view>-->
		</view>
		<view style="margin: 10px 5px; background-color: white;border-radius: 10px;
		box-shadow: 0 0 5px #d0d0d0;padding: 13px 13px 5px 15px;">
      <!-- 菜单列表 -->
			<view style="display: flex;margin-bottom :13px;align-items: center" v-for="(item,index) in list" :key="index">
				<view >
          <view style="font-size: 28px;padding-top: 2px;" :class="['mega-pixel-icon',' my-topic-color',item.icon]"></view>
				</view>
				<view  style="margin-left: 10px;font-size: 1.2rem;" @click="skip(item)">
					{{item.name}}
				</view>
			</view>
			
		</view>
    <!-- 底部菜单栏-->
    <u-tabbar z-index="888" :value="currentTab" @change="changeTab()"
              :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
              activeColor="#ff8cad"
              inactiveColor="#8f8f8f"
    >
      <u-tabbar-item :name="item.name" :text="item.text" v-for="(item,index) in tabList" :key="index">
        <view slot="active-icon" style="font-size: 18px" :class="['mega-pixel-icon','my-topic-color',item.icon]"></view>
        <view slot="inactive-icon" style="font-size: 18px;color: #8f8f8f" :class="['mega-pixel-icon',item.icon]"></view>
      </u-tabbar-item>
    </u-tabbar>
	</view>
</template>

<script>


  export default {
		data() {
			return {
        currentTab: 'people',
        tabList: [{
          text: '首页',
          name: 'home',
          icon: 'icon-home',
          page: '/pages/index/index'
        },
          {
            text: '个人中心',
            name: 'people',
            icon: 'icon-people',
            page: '/pages/my/my'
          }
        ],
				list: [
					{
            icon: 'icon-order',
						name: '我的订单',
						page: '/pages/order/order'
					},
					{
            icon: 'icon-shopping-cart',
						name: '店铺会员',
						page: '/pages/myVip/myVip'
					},
					{
            icon: 'icon-notice',
						name: '平台公告',
						page: ''
					},
          {
            icon: 'icon-setting',
            name: '个人设置',
            page: '/pages/my/module/edit'
          },
					{
            icon: 'icon-shutdown',
						name: '退出登录',
            page: ''
					}
				],
        userInfo: {
          nickName: '微信用户',
          avatarUrl: '',
          gender: 0 //性别 0：未知、1：男、2：女
        }
			}
		},
    created() {
      this.init()
    },
		methods: {

      changeTab(e) {
        if (e === this.currentTab) return
        for (const i of this.tabList){
          if (i.name === e) {

            const url = i.page
            this.$tab.redirectTo(url)
            break
          }
        }
      },

      init(){
        /*#ifdef MP-WEIXIN*/
        this.userInfo.nickName = this.$store.getters.name
        this.userInfo.avatarUrl = this.$store.getters.avatar

        // wx.getUserInfo({
        //   success: function(res) {
        //     console.log(res.userInfo)
        //     this.userInfo = res.userInfo
        //     // var userInfo = res.userInfo
        //     // var nickName = userInfo.nickName
        //     // var avatarUrl = userInfo.avatarUrl
        //     // var gender = userInfo.gender //性别 0：未知、1：男、2：女
        //     // var province = userInfo.province
        //     // var city = userInfo.city
        //     // var country = userInfo.country
        //   }
        // })
        /*#endif*/
      },
			change(e) {},
			click() {},
			editUser(){
				// console.log('编辑用户')
        this.$tab.navigateTo('/pages/my/module/edit')
			},
			skip(item){
				console.log(item.page)

        if (item.name === '退出登录'){
          uni.exitMiniProgram({
            success: function () {
              console.log('退出小程序成功');
            }
          });
        }else {
          this.$tab.navigateTo(item.page)
        }
			}
		}
	}
</script>

<style>
	page {
		background-color: white;
	}
</style>