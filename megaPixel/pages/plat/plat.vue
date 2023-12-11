<template>
  <view>
    <comm-navbar title="地图"/>
    <comm-empty/>
    <view >
    <map style="width: 100%; height: 94vh;" :latitude="latitude" :longitude="longitude" :markers="markers">
    </map>
    </view>
  </view>
</template>

<script>
import QQMapWX from '@/static/map-sdk/qqmap-wx-jssdk.min.js'
export default {
   // {QQMapWX} from '../../qqmap-wx-jssdk.js'
  // var QQMapWX = require('../../qqmap-wx-jssdk.js');
  data() {
    return {
      id: 0, // 使用 marker点击事件 需要填写id
      title: 'map',
      latitude: getApp().globalData.config.latitude,
      longitude: getApp().globalData.config.longitude,
      markers: [
          {
        id: 1,
        latitude: 22.815478,
        longitude: 108.327546,
        width:40,
        height:40,
        iconPath: '/static/images/common/pink_position.png'
        },
        {
          id: 2,
          latitude: 23.132191,
          longitude: 113.266530,
          width:40,
          height:40,
          iconPath: '/static/images/common/pink_position.png'
        }
      ]

    }
  },
  created() {
    const _this_ = this
    // let sys = getApp().globalData.config.systemInfo.windowHeight
    // console.log(sys)
    var qqmapsdk = new QQMapWX({
      key: 'R4RBZ-LBXCB-36SU5-JFBAW-KM4BO-VNBBX' // 必填，填自己在腾讯位置服务申请的key
    });
    //新增
    qqmapsdk.reverseGeocoder({
      //位置坐标，默认获取当前位置，非必须参数
      //Object格式
      location: {
        latitude: _this_.latitude,
        longitude: _this_.longitude
      },
      success: function(res) {//成功后的回调
        console.log(1)
        console.log(res)
      },
      fail: function(error) {
        console.log(2)
        console.error(error);
      },
      complete: function(res) {
        console.log(3)
        console.log(res);
      }
    })



  },
  onLoad() {
  	this.init()
  },
  computed(){


  },
  methods: {
    init(){
      this.handleAuthorize()
      //this.getMyLocal()
    },
    handleAuthorize() {
      uni.getSetting({
        success: res=> {
          if (!res.authSetting['scope.userLocation']){
            this.auth()
          }else {
            this.getMyLocal()
          }
        }})
    },
    auth(){
      const _this = this // 下边this 为undefined
      uni.authorize({
        scope: 'scope.userLocation', // 获取地理信息必填的参数，其它参数见文档
        success(){
          _this.getMyLocal()
        },
        // 授权失败
        fail(err) {
          console.log(err)
          err = err['errMsg']
          uni.showModal({
            title: '温馨提示',content: '百万像素小程序需要获取你的位置，请授权!',
            showCancel: false,
            confirmText: '确认授权'
          })
              // 这里只设置了确认按钮，没有取消按钮
          .then(res => {

                //res ： [null, {cancel: false, confirm: true, errMsg: 'showModal: ok'}]
                if(res['confirm']) { // 点击了确认按钮时
                  // 调用下边方法时，会弹出 【使用我的地理位置】界面， 未设置直接返回，还是会走fail授权失败的函数，
                  // 还是会弹出上边的温馨提示！！！
                  // 如果设置, scope.userLocation: true

                  uni.openSetting({
                    scope:{
                      userLocation: true
                    },
                    success:res=> {
                      if (res.authSetting['scope.userLocation']){
                        _this.getMyLocal()
                      }
                      // 如果不设置，res结果：
                      // {errMsg: "openSetting:ok", authSetting: {scope.userLocation: false}}
                      // 如果设置, res结果：
                      // {errMsg: "openSetting:ok", authSetting: {scope.userLocation: true}}
                      // console.log('小程序设置界面：', res)
                    }
                  })
                }
              })
        }
      })
    },

    getMyLocal(){
      let _this = this
      uni.getLocation({
        type: 'gcj02', // wgs84  gcj02
        success:function(res){
          // _this.latitude = res.latitude
          // _this.longitude = res.latitude
          let my = {
            id: 3,
            latitude: res.latitude,
            longitude: res.longitude,
            width:40,
            height:40,
            iconPath: '/static/images/common/myLocation.png'
            }
          _this.markers.push(my)
            console.log(res.longitude);
            console.log(res.latitude);
        }
      })
    }
  }
}
</script>

<style>

</style>
