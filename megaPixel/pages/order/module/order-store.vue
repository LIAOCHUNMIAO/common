<template>
  <view style="background-color: #f6f6f6">
    <view class="item-order" v-for="(item,index) in list" :key="index">
      <view class="order-store" @click="goStore(item.studio)">
        <view style="font-size: 19px;margin-right: 5px" class="mega-pixel-icon icon-store my-topic-color"></view>
        <view style="font-size: 18px;">{{ subValue(item.studio.name,true) }}</view>
        <view style="height: 15px;width: 15px;color: #858585" class="mega-pixel-icon icon-right"></view>
      </view>
      <view class="booking-item" style="display: flex">
        <image class="booking-icon" :src="item.sceneryBooking.scenery.cover.url" alt=""/>
        <view style="width: 100%;padding-left: 10px">
          <view class="flex-between">
            <view style="font-weight: bold;font-size: 1.2rem;color: #777777">{{
                item.sceneryBooking.scenery.name
              }}
            </view>
            <view class="rmb-money" style="font-weight: bold;font-size: 1.2rem;color: #7fbbff">
              {{ item.payAmount }}
            </view>
          </view>
          <view style="color: #9b9b9b;margin-top: 10px">
            <text style="margin-right: 20px">{{ dateToBiasDate(item.sceneryBooking.startTime) }}</text>
            <text>{{ dateSlicingTime(item.sceneryBooking.startTime) }}</text>
            <text>-</text>
            <text>{{ dateSlicingTime(item.sceneryBooking.endTime) }}</text>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
import {allOrder} from '@/api/index'
import {dateToBiasDate, dateSlicingTime} from "../../../utils/dateUtils";

export default {
  components: {},
  data() {
    return {
      list: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    dateToBiasDate(v) {
      return dateToBiasDate(v)
    },
    dateSlicingTime(v) {
      return dateSlicingTime(v)
    },

    init() {
      allOrder().then(res => {
        this.list = res
      })
    },

    goStore(item) {
      const data = {
        studioId: item.id,
        title: item.name
      }
      this.$tab.navigateTo('/pages/studio/studio?data=' + JSON.stringify(data))
    },

    subValue(v, isTitle) {
      if (isTitle) {
        if (v.length > 15) {
          return v.substring(0, 15) + '...'
        }
      } else {
        if (v.length > 35) {
          return v.substring(0, 35) + '...'
        }
      }
      return v
    }
  }
}
</script>

<style scoped lang="scss">
.item-order {
  margin-top: 10px;
  padding: 10px;
  //display: flex;
  background-color: #fff;

  //.order-left {
  //  width: 81%;

  .order-store {

    display: flex;
    align-items: center;
    margin: 5px 0px;

  }

  .booking-item {
    display: flex;
    margin-top: 5px;
    padding-bottom: 5px;
    //border-bottom: 1px solid #dddddd;
    .booking-icon {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      flex-shrink: 0;
    }

  }

  .order-item {

  }

  //}

  .order-right {
    margin-top: 20px;
    color: #89c2ff;
    font-size: 20px;
  }
}
</style>