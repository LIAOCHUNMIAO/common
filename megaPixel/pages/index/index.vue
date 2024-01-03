<template>
	<view >
    <m-tabbar-navbar title="百万像素"/>
    <comm-empty/>
    <view style="padding: 5px;">
    <!-- 轮播图 -->
		<view style="background-color: white;border-radius: 20px;box-shadow: 0 0 5px #bcbcbc;">
			<u-swiper height="180" :list="rotationPhoto"  keyName="url" @change="change" @click="showImg"></u-swiper>
		</view>
    <!-- 通知 -->
		<view style="margin-top: 10px;">
			<u-notice-bar bgColor='#ffffff' icon="bell" color='#faa1c7' :text="noticeValue"></u-notice-bar>
		</view>
    <!-- 商品分类 -->
		<view class="cate-gory">

      <van-grid gutter="20" column-num="3" icon-size="40">
        <van-grid-item
                       v-for="(item,index) in cateGory" :key="index"
                       :icon="item.img"
                       :text="item.name"
                       @click="goSearch(item)"
                       :style="{
                      filter:item.start? '': 'grayscale(100%)'
        			        }"

        />
      </van-grid>

<!--			<view class="cate-gory-item" v-for="(item,index) in cateGory" :key="index" @click="goSearch(item)"-->
<!--            :style="{-->
<!--              filter:item.start? '': 'grayscale(100%)'-->
<!--			      }">-->
<!--				<view style="width: 50px;height: 50px;padding: 5px;">-->
<!--					<img style="width: 100%;height: 100%;border-radius: 8px;" :src="item.img" alt="">-->
<!--				</view>-->

<!--				<view class="def-font-size" style="margin-top: 10px;">-->
<!--					{{item.name}}-->
<!--				</view>-->
<!--			</view>-->

		</view>
    </view>
    <!-- 底部菜单栏-->
    <u-tabbar z-index="888" :value="currentTab" @change="changeTab()"
              :fixed="true" :placeholder="true" :safeAreaInsetBottom="true"
              activeColor="#faa1c7"
              inactiveColor="#8f8f8f"
    >
      <u-tabbar-item :name="item.name" :text="item.text" v-for="(item,index) in tabList" :key="index">
        <view slot="active-icon" style="font-size: 18px" :class="['mega-pixel-icon','my-topic-color',item.icon]"></view>
        <view slot="inactive-icon" style="font-size: 18px;color: #8f8f8f" :class="['mega-pixel-icon',item.icon]"></view>
      </u-tabbar-item>
    </u-tabbar>



    <u-overlay :show="show" @click="clickOverlay">

      <view style="width: 100vw;height: 100%" class="flex-center">
          <view
              v-if="!hasPhone"
              style="width: 70vw;
          display: flex;
          align-items: end;
          flex-direction: column;
          background: #ffffff;height: 22vh;border-radius: 10px;overflow: hidden">
            <view  style="width: 100%;height: 70px;border-bottom: 1px solid #eee" class="flex-center">
              <text style="color: #ff6565;font-size: 16px;font-weight: bold">提示</text>
            </view>
            <view class="flex-center" style="width: 100%;height: 100%">
              <text style="color: #69afff;font-size: 17px;font-weight: bold">{{tips}}</text>
            </view>
            <view style="width: 100%;">
              <u-button :disabled="loginBtn"  open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary">登录</u-button>
            </view>
          </view>
      </view>
    </u-overlay>
	</view>
</template>

<script>
import {notice,album,getPhone} from '@/api/index'
import {getWechatAuth, getWechatUserInfo} from "@/utils/userAuth";
import constant from '@/utils/constant'
	export default {
		data() {
			return {
        loginBtn: false,
        show: false,
        currentTab: 'home',
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
        notice:{ id: null, announcement: '', userNotice: '', createdTime: '' },
        noticeValue:'',
				rotationPhoto: [],
				cateGory: [{
						name: '摄影棚',
						img: require('@/static/images/index/syp.png'),
						page: '',
						key: '1',
            start: true
					},
					{
						name: '摄影会',
						img: require('@/static/images/index/syh.png'),
						page: '',
						key: '2',
            start: false
					},
					{
						name: '服装租赁',
						img: require('@/static/images/index/fzzl.png'),
						page: '',
						key: '',
            start: false
					},
					{
						name: '道具租赁',
						img: require('@/static/images/index/djzl.png'),
						page: '',
						key: '3',
            start: false
					},
					{
						name: '器材测评',
						img: require('@/static/images/index/qccp.png'),
						page: '',
						key: '4',
            start: false
					},
					{
						name: '摄影展会',
						img: require('@/static/images/index/syzh.png'),
						page: '',
						key: '5',
            start: false
					}
				],
        hasPhone: true,
        phone: '',
        tips: '您还未授权登录'
			}
		},
    // 分享功能
    onShareAppMessage() {
      return {
        title: '百万像素',
        path: '/pages/index/index'
      }
    },
		onLoad() {
      uni.showShareMenu({
        withShareTicket: true,
        //设置下方的Menus菜单，才能够让发送给朋友与分享到朋友圈两个按钮可以点击
        menus: ["shareAppMessage", "shareTimeline"]
      })

      let s = uni.getStorageSync("start")
      console.log('index:'+s)
      if (s){
        this.doAuth()
      }else {
        this.init()
      }
		},
		methods: {
      showImg(e) {
        if (this.rotationPhoto !== null && this.rotationPhoto.length > 0){
          const photo = [this.rotationPhoto[e].url];//将该图片放入一个数组中，每次点击时只查看一张
          wx.previewImage({
            current: photo,     //当前图片地址
            urls: photo,                 //所有要预览的图片的地址集合 数组形式
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      doAuth(){
        this.phone = uni.getStorageSync(constant.userPhone)
        if (this.phone === null || this.phone === '' || this.phone === undefined) {
          this.show = true
          this.hasPhone = false
        } else {
          this.hasPhone = true
          this.auth()

        }
      },
      init(){
        notice().then(res =>{
          if (res === null || res === '' | res === undefined){
            this.noticeValue = ''
          }else {
            this.noticeValue = res.announcement+ ':'+res.userNotice
          }

        })
        album().then(res =>{
          this.rotationPhoto = res
        })
      },

      getPhoneNumber(e) {
        const code = e.detail.code
        getPhone({code: code}).then(res => {
          const r = res.data
          if (r.errmsg === 'ok') {
            this.loginBtn = true
            this.phone = r.phone_info['phoneNumber']
            uni.setStorageSync(constant.userPhone, this.phone)
            this.auth()
          } else {
            this.$modal.msg("授权失败，请稍后再试")
          }
        }).catch(err => {
          this.loginBtn = true
          this.tips = '授权失败，请稍联系管理员'
          this.$modal.msg("授权失败，请稍联系管理员")
        })
      },
      auth() {

        const _this_ = this
        getWechatAuth().then(authRes => {
          getWechatUserInfo().then(infoRes => {
            wx.login({
              success(res) {
                if (res.code) {
                  const param = {
                    code: res.code,
                    // avatar: infoRes.avatarUrl,
                    // name: infoRes.nickName,
                    phone: _this_.phone
                    // gender: infoRes.gender,
                    // province: ""
                  }
                  _this_.$store.dispatch('AutoLogin', param).then(rs => {
                    if (rs) {
                      _this_.show = false
                      _this_.$store.dispatch('GetInfo')
                      uni.setStorageSync("start", false)
                      _this_.init()
                    }
                    // else {
                    //   console.log('登录失败！' + res.errMsg)
                    // }
                  })
                } else {
                  console.log('登录失败！' + res.errMsg)
                }
              }
            })
          })
        })
      },

      clickOverlay(){

      },
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


      // hasPhone(){
      //   if (!this.$store.getters.hasPhone){
      //     this.$store.dispatch('GetInfo').then(res=>{
      //       if (!this.$store.getters.hasPhone){
      //         this.$modal.msg("授权提示！")
      //         return
      //       }
      //     })
      //   }
      // },

			change(e) {},
			click() {},
      // 跳转
      goSearch(item){
        // this.hasPhone()
        if (!this.$store.getters.hasPhone){
          this.$modal.msg("授权提示！")
          return
        }
        if (item.start){
          this.$tab.navigateTo('/pages/searchPage/searchPage?key='+item.key)
        }else {
          this.$modal.msg("该模块还未开启，敬请期待！")
        }
      }
		}
	}
</script>

<style>
	page {
		/* margin: 4px; */
		/* padding: 5px; */
	}
  .grid-icon{
    width: 50px;
    height: 50px;
  }

	.cate-gory {
		//width: 100%;
		margin-top: 20px;
		//display: grid;
		//grid-template-columns: auto auto auto;
		//grid-gap: 30px;
		//padding: 15px;
	}

	.cate-gory>.cate-gory-item {
		background: white;
		border-radius: 10px;
		text-align: center;
		padding: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>