<template>
  <view>
    <comm-navbar title="详情" :leftClick="leftClick"/>
    <comm-empty/>

    <view style="background: #fff;position: fixed;width: 100vw;height: 45px;z-index: 10;">
      <view style="display: flex;flex-direction: row;align-items: center;height: 100%">
        <u-subsection mode="button" bgColor="#fff" activeColor="#faa1c7" fontSize="18" :list="list"
                      :current="curNow" @change="sectionChange"></u-subsection>
      </view>
    </view>

    <view style="padding-top: 45px">

      <view class="content-Box" style="padding: 5px 20px;z-index: 4;" v-if="curNow === 0">
        <view style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 5px;padding: 5px 10px">
          <view style="font-size: 20px;font-weight: bold;color: #464646">{{ goods.name }}</view>
          <view>
            <view class="my-submit-button" style="font-weight: bold;" @click="goReservation">
              预 约
            </view>
          </view>
        </view>
        <view >
          <!-- 商品详情图片-->
          <image style="width: 100%;margin-bottom: 15px" v-for="(item,index) in reality" @click="previewImg(item)"
                 :key="index" :src="item.sceneryPhoto.url"></image>
          <!-- 商品描述-->
          <view style="margin-bottom: 20px;background: #fff;padding: 10px 10px;font-size: 17px">
<!--            class="rmb-money"-->
            <view v-if="goods.price !== null && goods.price !== ''"><text class="d-m-title">单&thinsp; &thinsp; &thinsp; &thinsp; 价：</text><text class="d-m-value rmb-money">{{goods.price}}</text></view>
            <view v-if="goods.area !== null && goods.area !== ''"><text class="d-m-title">面&thinsp; &thinsp; &thinsp; &thinsp; 积：</text><text class="d-m-value">{{goods.area}}</text></view>
            <view v-if="goods.style !== null && goods.style !== ''"><text class="d-m-title">风&thinsp; &thinsp; &thinsp; &thinsp; 格：</text><text class="d-m-value">{{goods.style}}</text></view>
            <view v-if="goods.capacity !== null && goods.capacity !== ''"><text class="d-m-title" > 人数上限：</text><text class="d-m-value">{{goods.capacity}} 人</text></view>
            <view v-if="goods.detail !== null && goods.detail !== ''"><text class="d-m-title">介&thinsp; &thinsp; &thinsp; &thinsp; 绍：</text><text class="d-m-value">{{goods.detail}}</text></view>
            <view v-if="goods.warning !== null && goods.warning !== ''"><text class="d-m-title">须&thinsp; &thinsp; &thinsp; &thinsp; 知：</text><text class="d-m-value">{{goods.warning}}</text></view>
            <view v-if="goods.startTime !== null && goods.startTime !== ''"><text class="d-m-title">开始时间：</text ><text class="d-m-value">{{goods.startTime}}</text></view>
            <view v-if="goods.endTime !== null && goods.endTime !== ''"><text class="d-m-title">结束时间：</text><text class="d-m-value">{{goods.endTime}}</text></view>
          </view>

        </view>
      </view>
      <view style="padding: 5px 20px;z-index: 4;" v-else>

        <view v-for="(item,index) in sample" :key="index"
              style="background: #fff;border-radius: 0px 0px 5px 5px;margin-bottom: 15px">
          <image style="width: 100%;" :src="item.sceneryPhoto.url" @click="previewImg(item)"/>
          <view style="display: flex;justify-content: space-between;padding: 15px 15px">
            <view>
              <view>{{ item.detail }}</view>
            </view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import {sceneryDetails} from "@/api/index";

export default {
  data() {
    return {
      contentTop: getApp().globalData.config.contentTop+45,
      sceneryId: null,
      info: {},
      goods: {},
      list: ['实景图', '样片'],
      curNow: 0,
      reality: [],
      sample:[],
    }
  },
  onLoad(e) {
    const data = JSON.parse(e.data)
    this.sceneryId = data.id
    this.goods = data
    // console.log(this.goods)

    this.init()
  },
  methods: {
    leftClick() {
      this.$tab.navigateBack()
    },
    init() {
      console.log(this.contentTop)
      sceneryDetails(this.sceneryId).then(res => {
        this.info = res

        let tempReality = []
        let tempSample = []
        this.info.sceneryPhotoRelations.forEach(item => {
          if (item.type === "1") {
            tempReality.push(item)
          } else {
            tempSample.push(item)
          }
        })

        this.reality = tempReality
        this.sample = tempSample
      })
    },
    previewImg(e){
      const photo = [e.sceneryPhoto.url];//将该图片放入一个数组中，每次点击时只查看一张
      wx.previewImage({
        current: photo,     //当前图片地址
        urls: photo,                 //所有要预览的图片的地址集合 数组形式
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    },

    sectionChange(index) {
      this.curNow = index;
    },
    goReservation() {
      const param = {
        studioId: this.info.studioId,
        sceneryId: this.info.id,
        startTime: this.info.startTime,
        endTime: this.info.endTime,
        price: this.info.price,
        studioName: this.info.name,
        info: this.info,
        paymentQr: this.goods.paymentQr,
        phone: this.goods.phone,
        wechatId: this.goods.wechatId,
        wechatQr: this.goods.wechatQr
      }
      this.$tab.navigateTo('/pages/booking/booking?data=' + JSON.stringify(param))
    }
  }
}
</script>

<style scoped>
.content-Box{

}
.d-m-title{
  font-weight: bold;
  //width: 100px;
  ////display: inline-block;
  //display: flex;
  //justify-content: space-between;
}
.d-m-value{
  font-weight: bold;
  color: #3c9cff;
}
</style>
