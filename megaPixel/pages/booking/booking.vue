<template>
	<view>
    <comm-navbar :title="studioName"/>
    <comm-empty/>

    <view>
		<view class="date-card" :style="{top: contentTop + 'px'}">
			<view class="title-font-size" style="font-weight: bold;">{{studioName}}</view>
			<view  style="display: flex;align-items: center;" @click="showCalendar">
				<view class="def-font-size" style="font-weight: bold;color: #999;margin: 10px 0px" @click="showCalendar">{{activeDay}} </view>
        <view @click="showCalendar" style="font-size: 18px;color: #8f8f8f" class="mega-pixel-icon icon-down"></view>
			</view>
      <!-- 日期选择卡-->
			<view class="day-card">
        <view class="day-item"  v-for="(item,index) in weeks" :key="index"
              @click="dayCard(item)"
              :style="{'background': item.isDidst ? '#d0d0d0': item.highLight ? '#faa1c7':'#fce3eb'  }">
          <view :style="{
            'marginBottom': '10px',
            'fontWeight': 'bold',
            'fontSize': '16px',
            'color': item.highLight? '#ffffff':'#999'
          }">{{item.week}}</view>
          <view
              :style="{
            'fontWeight': 'bold',
            'fontSize': '16px',
            'color': item.highLight? '#ffffff':'#707070'
          }"
          >{{item.day}}</view>
        </view>
      </view>
      <van-row class="def-font-size">
        <van-col span="12">

          <view style="display: flex;align-items: center;">
              <view style="height: 20px;width: 20px;background-color: #faa1c7;border-radius: 4px;margin-right: 5px"></view>
              <view>当前选择的时间</view>
          </view>
        </van-col>
        <van-col span="12">
          <view style="display: flex;align-items: center;">
            <view style="height: 20px;width: 20px;background-color: #d1d1d1;border-radius: 4px;margin-right: 5px"></view>
            <view>已被选择的时间</view>
          </view>
        </van-col>

      </van-row>

<!--			<view  class="def-font-size" style="display: flex;align-items: center;justify-content:space-around">-->
<!--				<view style="display: flex;align-content: center">-->

<!--				</view>-->
<!--				<view style="display: flex;align-content: center;justify-content: center">-->
<!--					<view style="height: 20px;width: 20px;background-color: #d1d1d1;border-radius: 4px;margin-right: 5px"></view>-->
<!--					<view>已被选择的时间</view>-->
<!--				</view>-->
<!--			</view>-->
		</view>

    <!-- 时间选择-->
		<view style="margin-bottom: 50px">
      <time-select ref="selectTime" @select="timeSelect" style="width: 90%;" :holding-time="disableTimes" :times="tradeTimes"></time-select>
    </view>

      <view style="position: fixed;bottom: 0;width: 100%">
        <view style="display: flex;align-items: center;height: 45px">
          <view style="flex-grow: 1;background: #faa1c7;height: 100%;" class="flex-center" @click="yy">
            <van-button  color="#faa1c7" type="primary" block>预 约</van-button>
<!--            <text  style="font-size: 17px;color: #fff;font-weight: bold">预 约</text>-->
          </view>

        </view>
      </view>


    <!-- 日期选择组件-->
    <u-calendar :defaultDate="activeDate"  showLunar @confirm="confirm" mode="single" :show="show" @close="show = false"></u-calendar>
	</view>
  </view>
</template>

<script>
	import {today,dateStyleConvert,weekdays,disableTime,getOtherTimeIntervals} from '@/utils/myUtils.js'
  import timeSelect from "./module/time-select.vue";
  import {calculateTimeIntervals, zeroReplace} from "../../utils/myUtils";
  import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";
	export default {
    components: {
      CommNavbar,
      timeSelect
    },
		data() {
			return {
        contentTop: getApp().globalData.config.contentTop,
				show: false,
				activeDay:'',
        activeDate:'',
				actDay: [], //用户选择的日期
        weeks: [],
        selectTime:[],
        disableTimes:[],
        closeTimes: [], // 打烊时间
        tradeTimes: [],
        studioId: null,
        sceneryId: null,
        studioName:null,
        price: null,
        info: {},
        paymentQr: null,
        phone: null,
        wechatId: null,
        wechatQr: null,
			}
		},
    onLoad(e) {
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#f8f8f8',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })

      const data =  JSON.parse(e.data)
      console.log(data)
      this.sceneryId = data.sceneryId
      this.studioId = data.studioId
      this.studioName = data.studioName
      this.price = data.price
      this.info = data.info

      this.wechatId = data.wechatId
      this.wechatQr = data.wechatQr
      this.phone = data.phone
      this.paymentQr = data.paymentQr


      this.closeTimes = getOtherTimeIntervals(data.startTime,data.endTime)

      this. tradeTimes = calculateTimeIntervals(data.startTime,data.endTime)

      this.activeDay = today('cn')
      this.activeDate =today('-')
      this.disableTimes = disableTime(this.activeDate)
      this.weeks = weekdays(this.activeDate)

      this.disableTimes.push(...this.closeTimes)
      // this.studioId = data.studioId
    },

		created() {

		},
		methods: {
			showCalendar(){
				this.show = true
			},
			confirm(e){
        this.activeDate = e[0]
        this.weeks = weekdays(this.activeDate)
        this.activeDay = dateStyleConvert(e[0],'cn')
        this.disableTimes = disableTime(this.activeDate)
				this.show = false
			},

      dayCard(item){
        if (item.isDidst){
          this.$modal.msg("不能选择过去时间")
          return
        }

        this.$refs['selectTime'].select = []
        this.$refs['selectTime'].start = ''
        this.$refs['selectTime'].end = ''

        if (item.date !== this.activeDay){
          this.activeDate = item.date
          this.weeks = weekdays(this.activeDate)
          this.activeDay = dateStyleConvert(this.activeDate,'cn')
          this.disableTimes = disableTime(this.activeDate)
          this.disableTimes.push(...this.closeTimes)

        }
      },
      yy(){
        if (this.selectTime.length<2){
          this.$modal.msg("预约时间至少2小时")
          return
        }

        const {startTime,endTime,amount} =this.convertTime(this.selectTime)
        let data = {
          date: this.activeDate,
          userId: 1,
          studioId: this.studioId,
          sceneryId: this.sceneryId,
          startTime: startTime,
          endTime: endTime,
          amount: amount,
          price: this.price,
          studioName : this.studioName,
          info: this.info,
          paymentQr: this.paymentQr,
          phone: this.phone,
          wechatId: this.wechatId,
          wechatQr: this.wechatQr
        }
        this.$tab.navigateTo('/pages/pay/prepare-pay?data='+JSON.stringify(data))
      },
      timeSelect(e){
        this.selectTime = e
      },
      convertTime(list){
        let t= []
        for (const i of list){
          t.push(parseInt(i.slice(0, 2)));
        }
        const max = Math.max(... t);
        const min = Math.min(... t);
        return{
          startTime: zeroReplace(min)+':00:00',
          endTime: zeroReplace(max+1)+':00:00',
          amount: list.length
        }
      }
			
		}
	}
</script>

<style scoped lang="scss">
.date-card{
  background-color: white;
  position: sticky;
  border: 1px solid #a1a1a1;
  padding: 15px;
}
.day-card{
  margin-bottom: 15px;
  display: flex;
  justify-content: space-around;
  .day-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 60px;
    background: #3c9cff;
    flex-grow: 1;
    margin: 4px;
  }
}

</style>