<template>
  <view>
    <comm-navbar title="详情"></comm-navbar>

    <view class="custom-nav-content">
      <view style="padding: 0px 10px">
        <view v-if="payType === myConstant().payType.vipPay">
          <view class="bj-color" style="font-size: 18px">
            <view class="flex-between">
              <view>商品价格</view>
              <view style="color: #3c9cff;" class="rmb-money">{{ payInfo.totalAmount }}</view>
            </view>
            <view class="flex-between">
              <view>会员优惠</view>
              <view style="color: #3c9cff;" class="rmb-money">-{{ payInfo.discountAmount }}</view>
            </view>
            <view class="flex-between">
              <view>实际支付</view>
              <view style="color: #3c9cff;" class="rmb-money">{{ payInfo.payAmount }}</view>
            </view>
          </view>
          <view class="bj-color" style="font-size: 18px">
            <view class="flex-between">
              <view>会员余额</view>
              <view class="rmb-money">￥0</view>
            </view>
            <view class="flex-between">
              <view>结算剩余</view>
              <view class="rmb-money">{{ payInfo.membershipDiscount }}</view>
            </view>

          </view>
          <view style="margin: 10px 30px;color: #5b5b5b;">
            <view>商家确认后方预定成功</view>
            <view>预定失败将会原路退还</view>

          </view>
        </view>
        <view v-else>
          <view class="bj-color">
            <view class="flex-between" style="font-size: 18px">
              <view>请添加商家微信并支付</view>
              <view style="padding-right: 20px;color: #3c9cff;" class="rmb-money">{{ payInfo.totalAmount }}</view>
            </view>
<!--            <view style="margin-top: 20px">请备注个人昵称及电话，商家确认后预定成功</view>-->
<!--            <view>长时间未确认请联系商家-->
<!--              <text style="color: red;margin-left: 10px">请截取转账截图并上传</text>-->
<!--            </view>-->
            <view style="display: flex;align-items: flex-end;justify-content: space-around;margin-top: 20px">

              <view>
                <view >商家微信</view>
                <image show-menu-by-longpress="true"
                       style="width: 120px;height: 120px;" :src="wechatQr"
                       @click="previewImage(wechatQr)"/>

              </view>
              <view style="height: 120px;display: flex;flex-direction: column;align-items: start;justify-content: space-between">

                <view>
                  微信号：{{ wechatId }}
                </view>
                <view>
                  手机号：{{ phone }}
                </view>
                <view style="margin-left: 50px">
                  <view></view>
                  <view @click="copy"
                        style="width: 90px;color: white;height: 33px;
                        display: flex;align-items: center;justify-content: center;
                        border-radius: 10px"
                        class="my-bj-topic-color"
                  >复制微信号
                  </view>
                </view>

<!--                <view @click="open" style="width: 100px;height: 120px;-->
<!--              border: 1px dashed  #eee">-->
<!--                  <image v-if="imgUrl !==''&& imgUrl !== null" style="width: 100%;height: 100%;" :src="imgUrl"></image>-->
<!--                  <view v-else style="width: 100%;height: 100%;font-size: 20px;color: #eee" class="flex-center">+</view>-->
<!--                </view>-->
<!--                <view-->
<!--                    style="width: 90px;-->
<!--                  color: white;-->
<!--                  height: 30px;-->
<!--                 margin-top: 10px;-->

<!--                  border-radius: 10px"-->
<!--                    class="my-bj-topic-color flex-center" @click="open">-->
<!--                  上传凭证-->
<!--                </view>-->

              </view>
            </view>
          </view>

        </view>
        <view class="bj-color">

          <view class="flex-around" style="margin: 5px 0px">
            <view style="width: 90px;display: flex;align-items: center;justify-content: center">姓名</view>
            <view>
              <u--input
                  border="none"
                  v-model="form.name"
              ></u--input>
            </view>
          </view>
          <view class="flex-around">
            <view style="width: 90px;display: flex;align-items: center;justify-content: center">
              电话
            </view>
            <view>
              <u--input
                  border="none"
                  v-model="form.phone"
              ></u--input>
            </view>
          </view>
        </view>
<!--        <view class="bj-color">-->
<!--          <view>商家微信</view>-->
<!--          <view class="flex-between">-->
<!--            <view>-->
<!--              <image show-menu-by-longpress="true" style="width: 120px;height: 120px;" :src="wechatQr"-->
<!--                     @click="previewImage(wechatQr)">-->
<!--              </image>-->
<!--            </view>-->
<!--            <view style="display: flex;flex-direction: column;justify-content: space-around;padding-right: 20px">-->
<!--              <view>-->
<!--                微信号：{{ wechatId }}-->
<!--              </view>-->
<!--              <view>-->
<!--                手机号：{{ phone }}-->
<!--              </view>-->
<!--              <view style="display: flex;justify-content: end">-->
<!--                <view></view>-->

<!--                <view @click="copy"-->
<!--                      style="width: 90px;color: white;height: 33px;-->
<!--              display: flex;align-items: center;justify-content: center;-->
<!--               border-radius: 10px"-->
<!--                      class="my-bj-topic-color"-->
<!--                >复制微信号-->
<!--                </view>-->
<!--              </view>-->
<!--            </view>-->
<!--          </view>-->

<!--        </view>-->
      </view>

      <view style="position: fixed;bottom: 0;width: 100%">
        <view style="display: flex;align-items: center;height: 45px">
          <view style="flex-grow: 1;background: #faa1c7;height: 100%;" class="flex-center"  @click="goBack">
            <text style="font-size: 17px;color: #fff;font-weight: bold">返 回</text>
          </view>
          <view style="flex-grow: 1;background: #faa1c7;height: 100%;" class="flex-center" @click="finish" >
            <text style="font-size: 17px;color: #fff;font-weight: bold">下一步</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import myConstant from "@/utils/myConstant";
import {order, uploadUrl} from "@/api/index";
import {newDateTime} from "../../utils/dateUtils";
import {getToken} from '@/utils/auth'
import constant from '@/utils/constant'
export default {
  components: {
    myConstant() {
      return myConstant
    }
  },
  data() {
    return {
      payType: '',
      action: uploadUrl,
      fileList: [],
      header: {
        Authorization: 'Bearer ' + getToken()
      },
      form: {
        name: null,
        phone: null
      },
      qrCodeUrl: require('@/static/images/common/666.png'),
      payInfo: {
        userId: "1",
        studioId: "2",
        sceneryId: "1",
        startTime: "2023-10-30 16:00:00",
        endTime: "2023-10-30 18:00:00",
        amount: "2",
        orderType: "0",
        createTime: "2023-10-15 22:00:00",
        payType: "0",
        orderName: "伢伢gagako",
        orderPhone: "19822272675",
        comment: "sint ullamco dolore magna",
        membershipDiscount: "0.90",
        membershipDiscountId: 1,
        unitPrice: "280",
        totalAmount: "560",
        payAmount: "504",
        discountAmount: "56",
        status: "0"
      },
      // studioPhone: this.$store.getters.studioPhone,
      // studioWechatId: this.$store.getters.studioWechatId
      paymentQr: null,
      phone: null,
      wechatId: null,
      wechatQr: null,
      imgUrl: '',
    }
  },
  onReady() {

  },
  onLoad(e) {
    this.form.name = this.$store.getters.name
    this.form.phone = uni.getStorageSync(constant.userPhone)

    if (this.$utils.isNotNull(e)) {
      const data = JSON.parse(e.data)
      this.wechatId = data.wechatId
      this.wechatQr = data.wechatQr
      this.phone = data.phone
      this.paymentQr = data.paymentQr

      this.payInfo = data
      this.payInfo.totalAmount = this.payInfo.price * Number(this.payInfo.amount)
      // this.studioPhone =this.$store.getters.studioPhone
      // this.studioWechatId =this.$store.getters.studioWechatId
      //
      // console.log(this.$store.getters)
    }


  },
  methods: {
    myConstant() {
      return myConstant
    },
    goBack() {
      uni.navigateBack()
    },
    open() {
      const this_ = this
      uni.chooseImage({
        success: (res) => {
          this_.imgUrl = res.tempFilePaths[0];

        }
      });
    },
    previewImage(e) {
      uni.previewImage({
        // 需要预览的图片链接列表
        urls: [e],
        // 为当前显示图片的链接/索引值
        current: e,
        // 图片指示器样式
        indicator: 'default',
        // 是否可循环预览
        loop: false,

        success: res => {
          console.log('res', res);
        },
        fail: err => {
          console.log('err', err);
        }
      });
    },
    finish() {

      // if (this.$utils.isNull(this.form.name)) {
      //   this.$modal.msg("请填写姓名")
      //   return
      // }
      // const phoneReg = /^1[3456789]\d{9}$/
      //
      // const phone = this.form.phone ? this.form.phone.replace(/\s/g, '') : ''// 去除空格
      // if (this.$utils.isNotNull(phone)) {
      //   if (!phoneReg.test(phone)) {
      //     this.$modal.msg("手机格式不正确")
      //     return
      //   }
      // } else {
      //   this.$modal.msg("请填写电话")
      //   return
      // }

      let file = {
        bucketName: "",
        id: null,
        pathKey: "",
        region: "",
        type: "image",
        url: ""
      }


      let param = {
        startTime: this.payInfo.startTime,
        endTime: this.payInfo.endTime,
        amount: this.payInfo.amount + '',
        orderType: "0",
        createTime: newDateTime(),
        payType: "0",
        orderName: this.form.name,
        orderPhone: this.form.phone,
        comment: "ok"
      }

      this.payInfo.createTime = newDateTime()


      const this_ = this
      if (this.imgUrl === '' || this.imgUrl === null) {

        // param['paymentScreenshoot'] = file
        order(this_.payInfo.sceneryId, param).then(res => {
          const status = res
          if (status === 'true' || status === true) {
            let data = {
              back: '/pages/index/index'
            }
            this.$tab.navigateTo('/pages/order/order?data=' + JSON.stringify(data))
          } else {
            this.$modal.msg("提交失败，请稍后再试")

          }

        }).catch(err => {
          this.$modal.msg("提交失败，请稍后再试")
        })

      } else {
        console.log('有')
        uni.uploadFile({
          url: this_.action, //仅为示例，非真实的接口地址
          filePath: this_.imgUrl,
          name: 'file',
          header: this_.header,
          formData: {
            //要上传的文件
            file: this_.imgUrl
          },
          success: (fileRes) => {

            param['paymentScreenshoot'] = JSON.parse(fileRes.data)

            order(this_.payInfo.sceneryId, param).then(res => {
              const status = res
              if (status === 'true' || status === true) {
                let data = {
                  back: '/pages/index/index'
                }
                this.$tab.navigateTo('/pages/order/order?data=' + JSON.stringify(data))
              } else {
                this.$modal.msg("提交失败，请稍后再试")

              }

            }).catch(err => {
              this.$modal.msg("提交失败，请稍后再试")
            })
          }
        });
      }


    },
    copy() {
      uni.setClipboardData({
        data: this.wechatId,
        success: function () {
          this.$modal.msg("复制成功！")
        }
      })
    }
  }
}
</script>

<style scoped>
.bj-color {
  background: white;
  border-radius: 5px;
  padding: 10px;
  color: #5b5b5b;
  margin-top: 10px;
}

/deep/ .u-input {
  height: 40px;
  background: rgb(241, 239, 239);
  border-radius: 0px;
//padding: 0px 4px;
}

/deep/ .uni-input-input {

  padding-left: 10px;
}
</style>
