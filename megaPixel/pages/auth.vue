<template>
  <view>
    <m-tabbar-navbar title="登录"/>
    <comm-empty/>
    <button v-if="!hasPhone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录</button>
  </view>
</template>

<script>
import constant from '@/utils/constant'
import {getWechatAuth, getWechatUserInfo} from "../utils/userAuth";
import {getPhone} from "../api/index";

export default {
  data() {
    return {
      phone: null,
      hasPhone: true
    }
  },
  created() {
    this.init()
    // this.auth()
  },
  methods: {
    init() {
      this.phone = uni.getStorageSync(constant.userPhone)
      // console.log(this.phone)
      if (this.phone === null || this.phone === '' || this.phone === undefined) {
        this.hasPhone = false
      } else {
        this.auth()
      }
    },
    getPhoneNumber(e) {
      const code = e.detail.code
      // console.log(code)
      getPhone({code: code}).then(res => {
        const r = res.data
        if (r.errmsg === 'ok') {
          this.phone = r.phone_info['phoneNumber']
          uni.setStorageSync(constant.userPhone, this.phone)
          this.auth()
        } else {
          this.$modal.msg("授权失败，请稍后再试")
        }
      })
    },
    auth() {
      this.$modal.loading("登录中，请耐心等待...")
      const _this_ = this
      getWechatAuth().then(authRes => {
        getWechatUserInfo().then(infoRes => {
          wx.login({
            success(res) {
              if (res.code) {
                console.log(res.code)
                const param = {
                  code: res.code,
                  avatar: infoRes.avatarUrl,
                  name: infoRes.nickName,
                  phone: _this_.phone, //13620517763
                  gender: infoRes.gender,
                  province: "上海"
                }

                _this_.$store.dispatch('AutoLogin', param).then(rs => {
                  if (rs) {
                    _this_.$store.dispatch('GetInfo')
                    _this_.$tab.reLaunch('/pages/index/index')
                  } else {
                    console.log('登录失败！' + res.errMsg)
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
        })
      })
    }

  }
}
</script>

<style>

</style>
