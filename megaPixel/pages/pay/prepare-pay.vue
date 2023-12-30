<template>
	<view>
    <comm-navbar title="详情"></comm-navbar>

    <view class="custom-nav-content">
      <view style="margin:10px;padding-top:10px;display: flex;justify-content: space-between;align-items: center">

        <image style="width: 150px;height: 100px" :src="imgUrl" @click="showImg(imgUrl)"></image>
        <view style="display: flex;
        letter-spacing: 2px;
          align-items: center;">

          <view
              class="title-font-size"
              style="height: 55px;background: #8eaaff;display: flex;
          align-items: center;justify-content: center;color: white;font-weight: bold;
          border-radius: 10px;
          padding: 0px 10px;
          ">实付价格<text class="rmb-money">{{param.realityTotalMoney}}</text></view>
        </view>
      </view>

      <view class="def-font-size" style="background: white;margin: 10px;padding: 10px 20px  20px 20px;">
        <view class="details-item">
          <view>{{param.studioName}}</view>
          <view class="rmb-money" style="color: #5eadff;">{{param.price}}/h</view>
        </view>
        <view class="details-item">
          <view>会员优惠</view>
          <view  class="rmb-money" style="color: #5eadff;">{{preferential}}</view>
        </view>
        <view class="details-item">
          <view>日期</view>
          <view>{{date}}</view>
        </view>
        <view class="details-item">
          <view>时间</view>
          <view>{{time}}</view>
        </view>
        <view class="details-item">
          <view>数量</view>
          <view>{{param.amount}}小时</view>
        </view>
<!--        <view>赠送222</view>-->
      </view>

      <view style="background: white;margin: 10px;padding: 10px 20px;">
        <view class="def-font-size">支付方式</view>
        <view class="def-font-size" style="color: #7e7e7e">
          <view style="display: flex;justify-content: space-between;align-items: center;margin: 16px 0px">
            <view  style="flex-grow: 1;display: flex;justify-content: space-between;margin-right: 45px">
              <view>会员卡余额</view>
              <view>剩余 ￥0</view>
            </view>

            <view  style="width: 20px;height: 20px;border: 2px solid #b0b0b0; border-radius: 50%;">
<!--              <view v-if="param.payType !== myConstant.payType.vxPay" style="border-radius: 50%;width: 10px;height: 10px;background: #b0b0b0;margin: 3px"></view>-->
            </view>

          </view>
          <view style="display: flex;justify-content: space-between;align-items: center;">
            <view>微信转账</view>
            <view  style="width: 20px;height: 20px;border: 2px solid #b0b0b0; border-radius: 50%;"
                   @click="payTypeHandle(myConstant.payType.vxPay)"
            >
              <view v-if="param.payType === myConstant.payType.vxPay" style="border-radius: 50%;width: 10px;height: 10px;background: #b0b0b0;margin: 3px"></view>
            </view>
        </view>
      </view>

    </view>
    </view>
    <view style="position: fixed;bottom: 0;width: 100%;">
      <view style="display: flex;align-items: center;height: 45px">

        <view style="flex-grow: 1;background: #faa1c7;height: 100%;" class="flex-center" @click="goBack">
          <text  style="font-size: 17px;color: #fff;font-weight: bold">返 回</text>
        </view>
        <view  style="flex-grow: 1;background: #faa1c7;height: 100%;" class="flex-center" @click="next">
          <text  style="font-size: 17px;color: #fff;font-weight: bold">下一步</text>
        </view>
<!--        <u-button type="primary"  color="#faa1c7" @click="goBack">-->
<!--          <text style="font-size: 16px">返 回</text>-->
<!--        </u-button>-->
<!--        <u-button type="primary"  color="#faa1c7" text="下一步"  @click="next">-->
<!--          <text style="font-size: 16px">下一步</text>-->
<!--        </u-button>-->
      </view>
    </view>
	</view>
</template>

<script>
	import myConstant from "../../utils/myConstant";
  import {booking} from "../../api/index";

  export default {
    computed: {
      myConstant() {
        return myConstant
      }
    },
		data() {
			return {
        temp: 3,
        preferential:0,
        param:{
          totalMoney:0,
          realityTotalMoney:0,
          payType: myConstant.payType.vxPay,
          amount:null,
          date:null,
          endTime:null,
          sceneryId:null,
          startTime:null,
          studioId:null,
          userId:null,
          price: null,
          studioName : null,

        },
        info: {},
        imgUrl:'',
        paymentQr: null,
        phone: null,
        wechatId: null,
        wechatQr: null,
        date: '',
        time: ''
			}
		},

    onLoad(e) {

      if (this.$utils.isNotNull(e)) {
        const data = JSON.parse(e.data)
        this.param.amount = data.amount
        this.param.date = data.date
        this.param.endTime = data.endTime
        this.param.startTime = data.startTime
        this.param.sceneryId = data.sceneryId
        this.param.studioId = data.studioId
        this.param.price = data.price
        this.param.studioName = data.studioName
        this.param.userId = data.userId
        this.info = data.info
        this.param.totalMoney = data.price*data.amount
        this.param.realityTotalMoney= data.price * data.amount

        const dt =  data.date.split('-')
        this.date = dt[1]+'月'+dt[2]+'日'

        this.wechatId = data.wechatId
        this.wechatQr = data.wechatQr
        this.phone = data.phone
        this.paymentQr = data.paymentQr
       this.time = data.startTime.substring(0, 5)+' - '+data.endTime.substring(0, 5)


       this.imgUrl =  this.info.sceneryPhotoRelations[0].sceneryPhoto.url
        console.log(data)
      }
    },
		methods: {

      payTypeHandle(v){
        this.param.payType = v
        if (v === myConstant.payType.vipPay){
          this.preferential = this.temp
          this.param.realityTotalMoney = this.param.totalMoney-this.temp
        }else {
          this.preferential = 0
          this.param.realityTotalMoney = this.param.totalMoney
        }
      },
      goBack(){
        uni.navigateBack()
      },
      showImg(e) {
        // if (this.coverList !== null && this.coverList.length > 0){
          const photo = [e];//将该图片放入一个数组中，每次点击时只查看一张
          wx.previewImage({
            current: photo,     //当前图片地址
            urls: photo,                 //所有要预览的图片的地址集合 数组形式
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })
        // }
      },
      next(){
        if(this.param.payType == null){
          this.$modal.msg("请选择支付方式")
          return
        }
        // console.log(this.param)

        const params={
            userId: this.param.userId+ '',
            studioId: this.param.studioId+ '',
            sceneryId:this.param.sceneryId+ '',
            startTime: this.param.date + ' '+ this.param.startTime,
            endTime: this.param.date + ' '+ this.param.endTime,
            amount: this.param.amount,
            orderType: "0",
            createTime: "",
            payType: this.param.payType+ '',
            orderName: "",
            orderPhone: "",
            comment: "无",
            price: this.param.price,
            paymentQr: this.paymentQr,
            phone: this.phone,
            wechatId: this.wechatId,
            wechatQr: this.wechatQr
        }
        this.$tab.navigateTo('/pages/pay/pay?data=' + JSON.stringify(params))
      },
      convertTime(time){
        console.log(time)
        if (time === null) return
        return  time.substring(0,5)
      },
      convertDate(date){
        console.log(date)
        if (date === null) return
          const d =  date.split('-')
        return  d[1]+'月'+d[2]+'日'
      },
		}
	}
</script>

<style scoped>
.pay-select{
  background: #3c9cff;
}
.details-item{
  margin: 8px 0px;
  display: flex;
  justify-content: space-between;
}
</style>
