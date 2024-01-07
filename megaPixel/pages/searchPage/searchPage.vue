<template>
  <view>
    <comm-navbar title="百万像素" :bgColor="'#ff8cad'" :title-color="'#fff'"  :is-top="true" :autoBack="false"/>
    <comm-empty/>
    <view
         class="query-box"
         :style="{height: navHeight + 'px'}">
      <view style="display: flex;align-items: center" @click="openCity">
        <view  style="color: white;margin-right: 5px;font-size: 14px">{{ queryParams.province }}</view>
        <view style="height: 18px;width: 18px;padding-top: 2px;color: #ababab" class="mega-pixel-icon icon-down"></view>
      </view>
      <view style="flex-grow: 1;margin-left: 20px">
        <u-search placeholder="快速搜索" :actionStyle="{color: '#fff'}" v-model="queryParams.keyword" @search="search" @custom="search"></u-search>
      </view>
    </view>

    <view >
      <!-- 搜索结果列表-->
      <!-- 搜索结果列表-->
      <view @click="skip(item)" v-for="(item,index) in list" :key="index"
            style="display: flex; padding: 10px;
             background: #fff;
            ">
        <view style="width: 65px;height: 65px;flex-shrink: 0;">
          <image style="width: 100%;height:100%;border-radius: 5px" :src="item.avatar2.url"></image>
        </view>
        <view style="margin-left: 10px;">
          <view style="font-weight: bold;margin-bottom: 5px;font-size: 0.9rem">{{subValue(item.name,true)}}</view>
          <view style="color: #939292;font-size: 0.7rem">{{subValue(item.intro,false)}}</view>
        </view>
      </view>
<!--      <view-->
<!--          style="margin-bottom: 5px"-->
<!--          v-for="(item,index) in list" :key="index"-->
<!--          @click.stop="skip(item)">-->
<!--        <van-card-->
<!--            :desc="subValue(item.intro,false)"-->
<!--        >-->
<!--          <view slot="thumb" >-->
<!--            <van-image width="75" height="75" :src="item.avatar2.url" />-->
<!--          </view>-->

<!--          <view slot="title" style="font-weight: bold;font-size: 0.8rem">-->
<!--            {{subValue(item.name,true)}}-->
<!--          </view>-->
<!--        </van-card>-->
<!--      </view>-->

    </view>
    <!-- 选择城市-->
    <u-popup :show="show" @close="closeCity" @open="open"  :round="10">
      <view style="height: 350px;">
        <view style="display: flex;align-items:center; justify-content: space-between;margin: 5px 8px">
          <view  style="width: 25px;height:25px;"></view>
          <view  style="font-weight: bold">省或直辖市</view>
          <view @click="closeCity" style="font-size: 25px;padding-top: 2px;color: #8f8f8f" class="mega-pixel-icon icon-close"></view>
        </view>

        <view  style="margin: 0px 5px;height: 100%;overflow-y: scroll;padding-bottom: 35px">
          <view v-for="(item,index) in cityList" :key="index" class="flex-center"
                style="border-bottom: 1rpx solid #ececec;width: 100%;" @click="selectCity(item)">
            <view style="font-size: 16px;margin: 10px;">{{item.short_name}}</view>
          </view>

        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {citys} from "./city";
import {allStudio} from '@/api/index'
import {allStudioByParam} from "../../api/index";
import CommNavbar from "../../components/comm-navbar/comm-navbar.vue";
export default {
  components: {CommNavbar},
  computed: {

  },
  props: {
    goodsType: {  //字符串
      type: String,
      default: ''
    },
  },
  data() {
    return {
      navHeight: getApp().globalData.config.navHeight,
      show: false,
      cityList: citys,
      queryParams: {
        province: '上海', //地区 district
        keyword:null //关键字
      },
      list: []
    }
  },
  onLoad(e) {
    if (this.$store.getters.province !== null
        && this.$store.getters.province !== undefined
        && this.$store.getters.province !== ''){
      this.queryParams.province = this.$store.getters.province

    }
    this.init()
  },
  created() {
  },
  methods: {
    goBack() {
      this.$tab.navigateBack()
    },
    init(){

      let param = {}
      Object.keys(this.queryParams).forEach(key =>{
        if (this.$utils.isNotNull(this.queryParams[key])){
          param[key] = this.queryParams[key]
        }
      })
      allStudio(param).then(res =>{
        this.list = res
      })
    },
    skip(item){
      const data = {
        studioId: item.id,
        title: item.name
      }
      this.$tab.navigateTo('/pages/studio/studio?data='+JSON.stringify(data))

       // this.$tab.navigateTo('/pages/store/store?data='+JSON.stringify(data))
    },

    search(){
      const key  = this.queryParams.keyword
      if (key=== ''|| key===null|| key===undefined){
        this.init()
        return
      }
      let param = {
        keyword: key,
        province:this.queryParams.province
      }
      allStudioByParam(param).then(res =>{
        this.list = res
        // this.queryParams.keyword = null
      })
    },
    openCity() {
      this.show = true
    },
    closeCity() {
      this.show = false
    },
    selectCity(e) {
      this.queryParams.province = e.short_name

      this.init()
      this.show = false
    },
    open() {
    },
    close() {
      this.show = false
    },
    subValue(v,isTitle){

      if (isTitle){
        if (v.length> 17){
          return v.substring(0,16)+'...'
        }
      }else {
        if (v.length> 50){
          return v.substring(0,50)+'...'
        }
      }
      return v
    }
  }
}
</script>

<style>
.query-box{
  display: flex;align-items: center;
  justify-content: space-between;
  background: #ff8cad; // #faa1c7
  padding:0px 10px;
}
page{
  //background-color: #fff;
}
/deep/ .u-action-sheet__item-wrap {
  height: 200px;
  overflow-x: hidden;
}
</style>
