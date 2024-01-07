<template>
  <view style="margin: 0px 10px">
    <view v-for="(item,index) in times" :key="index" style="display: flex;align-items: center">
      <view style="width: 50px;font-size: 15px;color: #8c8b8b;font-weight: bold">{{ item }}</view>

      <!-- #ifdef H5 -->
      <view class="def-style" :style="defStyles(item)" @click="selectTime(item,index)">
        <text v-if="select[0] === item">start</text>
        <text v-else-if="select[select.length-1] === item">end</text>
        <text v-else-if="select.includes(item)" style="opacity: 0.8">...via...</text>
      </view>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN-->
      <view class="def-style" :style="[defStyles(item)]" @click="selectTime(item,index)">
        <text v-if="select[0] === item">start</text>
        <text v-else-if="select[select.length-1] === item">end</text>
        <text v-else-if="select.includes(item)" style="opacity: 0.5">...via...</text>
      </view>
      <!-- #endif -->

<!--      <view class="def-style" :style="[defStyles(item)]" @click="selectTime(item,index)"></view>-->
    </view>
  </view>
</template>

<script>
import {isValueInArray} from '@/utils/myUtils.js'
export default {
  props: {
    times: {
      type: Array,
      default: () => {
        return ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      }
    },
    holdingTime: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      select: [],
      start: '',
      end: '',

    }
  },
  created() {

  },
  methods: {
    init() {

    },
    defStyles(time) {
      let reStyle;
      if (isValueInArray(this.holdingTime,time)) {
        /*#ifdef H5*/
        reStyle = "background: #d1d1d1"
        /*#endif*/
        /*#ifdef MP-WEIXIN*/
        reStyle = {"background": "#d1d1d1"}
        /*#endif*/


      }
      if (isValueInArray(this.select,time)) {

        /*#ifdef H5*/
        reStyle = "background: #faa1c7"
        /*#endif*/

        /*#ifdef MP-WEIXIN*/
        reStyle = {"background": "#ff8cad"}
        /*#endif*/


      }
      return reStyle
    },
    selectTime(time) {
      if (this.holdingTime.includes(time))return
      if (!this.start) {
        // 第一次点击，设置开始时间
        this.start = time;
        this.select.push(time)
      } else if (!this.end) {
        // 第二次点击，设置结束时间并更新 select
        this.endSelectRange(this.start,time);
      } else {
        // 其他点击，清空开始和结束时间
        this.select = []
        this.start = ''
        this.end = ''
      }
      this.$emit('select', this.select)

    },
    endSelectRange(startTime, endTime) {
      const s =  this.times.indexOf(startTime)
      const n =  this.times.indexOf(endTime)
      // 如果一样，证明是取消选择
      if (s === n){
        this.select = []
        this.start = ''
        this.end = ''
        return
      }
      const fs = s<n ?  s:n
      const fn = s<n ?  n:s
      let  isOk = true
      let tSelect = []
      out: for (let i = fs; i <= fn; i++) {
        tSelect.push(this.times[i])
        for (const un of this.holdingTime) {
          if (i === this.times.indexOf(un)){
            isOk = false
            break out
          }
        }
      }
      if (isOk){
        this.select = tSelect
        this.end = endTime
      }else {
        this.$modal.msg("只能选择连续的时间段")
      }
    },
  }
}
</script>

<style>
.def-style {
  flex-grow: 1;
  border: 1px solid #fcd9e8;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 5px;
  color: white;
  height: 70px;
}
</style>
