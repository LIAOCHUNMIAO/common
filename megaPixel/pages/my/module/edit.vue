<template>
  <view>
    <comm-navbar title="编辑" :bgColor="'#ff8cad'" :title-color="'#fff'"  :is-top="true"></comm-navbar>
    <comm-empty/>
    <view>
      <form  @submit="formSubmit">

        <view style="padding: 20px;background: #fff">
          <view class="flex-center" style="flex-direction: column">
            <button class="avatar-style" open-type='chooseAvatar' @chooseavatar="getIcon">
              <image style="width: 100%;height: 100%;" :src="avatarUrl"/>
            </button>
            <view>头像</view>
          </view>

          <van-cell-group>
            <van-field
                :value="from.name"
                label="姓名"
                id="userNameInput"
                @blur="userNameInput"
                type="nickname"
                clearable
                placeholder="请输入姓名"
            />
            <van-field
                :value="from.gender"
                label="性别"
                disabled
                clearable
                placeholder="请选择性别"
            >
              <van-button color="#ff8cad" slot="button" size="small" type="primary" @click="genderShow = true">
                选择性别
              </van-button>
            </van-field>

            <van-field
                :value="from.province"
                label="地区"
                disabled
                clearable
                placeholder="请选择地区"
            >
              <van-button color="#ff8cad" slot="button" size="small" type="primary" @click="cityShow = true">
                选择地区
              </van-button>
            </van-field>
          </van-cell-group>

        </view>
        <view style="position: fixed;bottom: 0;width: 100%">
          <view style="display: flex;align-items: center;height: 45px">
            <van-button style="flex-grow:1" color="#ff8cad" type="primary" block  formType="submit">提 交</van-button>
          </view>
        </view>
      </form>
    </view>
    <!-- 选择城市-->
    <u-popup :show="cityShow" @close="closeCity" :round="10">
      <view style="height: 350px;">
        <view style="display: flex;align-items:center; justify-content: space-between;margin: 5px 8px">
          <view style="width: 25px;height:25px;"></view>
          <view style="font-weight: bold">省或直辖市</view>
          <view @click="closeCity" style="font-size: 25px;padding-top: 2px;color: #8f8f8f"
                class="mega-pixel-icon icon-close"></view>
        </view>

        <view style="margin: 0px 5px;height: 100%;overflow-y: scroll;padding-bottom: 35px">
          <view v-for="(item,index) in cityList" :key="index" class="flex-center"
                style="border-bottom: 1rpx solid #ececec;width: 100%;" @click="selectCity(item)">
            <view style="font-size: 16px;margin: 10px;">{{ item.short_name }}</view>
          </view>

        </view>
      </view>
    </u-popup>

    <u-popup :show="genderShow" @close="closeGender" :round="10">
      <view style="height: 200px;">
        <view style="display: flex;align-items:center; justify-content: space-between;margin: 5px 8px">
          <view style="width: 25px;height:25px;"></view>
          <view style="font-weight: bold">性别</view>
          <view @click="closeGender" style="font-size: 25px;padding-top: 2px;color: #8f8f8f"
                class="mega-pixel-icon icon-close"></view>
        </view>

        <view style="margin: 0px 5px;height: 100%;overflow-y: scroll">
          <view v-for="(item,index) in genderList" :key="index" class="flex-center"
                style="border-bottom: 1rpx solid #ececec;width: 100%;" @click="selectGender(item)">
            <view style="font-size: 16px;margin: 10px;">{{ item.name }}</view>
          </view>

        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import {citys} from "../../searchPage/city";
import myConstant from "@/utils/myConstant";

import {updateInfo, uploadUrl} from "@/api/index";
import {newDateTime} from "@/utils/dateUtils";
import {getToken} from "@/utils/auth";
import CommNavbar from "../../../components/comm-navbar/comm-navbar.vue";
import storage from '@/utils/storage'
import constant from '@/utils/constant'
export default {
  components: {CommNavbar},
  data() {
    return {
      action: uploadUrl,
      header: {
        Authorization: 'Bearer ' + getToken()
      },
      from: {
        startTime: newDateTime(),
        gender: '',
        province: '',
        avatar: null,
        name: null
      },
      cityShow: false,
      cityList: citys,
      genderShow: false,
      genderList: myConstant.genderType,
      avatarUrl: '',
      avatarInfo: null
    }
  },
  created() {
    this.avatarUrl = storage.get(constant.avatar)
    this.from.name = storage.get(constant.name)
    this.from.province = storage.get(constant.province)
    this.avatarInfo = storage.get(constant.avatarInfo)
    console.log('------------------------------')
    console.log(this.avatarInfo)
    console.log('------------------------------')

    const sex =  storage.get(constant.gender)

    this.genderList.forEach(i => {
      if (sex === i.id || sex === i.name) {
        this.from.gender = i.name
      }
    })
  },
  methods: {
    userNameInput(e){
      this.from.name = e.detail.value
    },
    formSubmit(e) {

      //
      if (this.from.avatar === null){
        this.from.avatar = this.avatarInfo
      }
      this.$modal.msgSuccess("提交成功！")
      updateInfo(this.from).then(res => {
        this.$store.dispatch('GetInfo').then(res=>{
          this.$tab.navigateBack()
        })
      })
    },
    getIcon(e) {
      // console.log(e.detail.avatarUrl)
      this.avatarUrl = e.detail.avatarUrl
      this.uploadAvatar()
    },
    closeCity() {
      this.cityShow = false
    },
    selectCity(e) {
      this.from.province = e.short_name
      this.cityShow = false
    },
    closeGender() {
      this.genderShow = false
    },
    selectGender(e) {
      this.from.gender = e.name
      this.genderShow = false
    },
    uploadAvatar() {
      const this_ = this
      uni.uploadFile({
        url: this_.action, //仅为示例，非真实的接口地址
        filePath: this_.avatarUrl,
        name: 'file',
        header: this_.header,
        formData: {
          //要上传的文件
          file: this_.avatarUrl
        },
        success: (fileRes) => {
          console.log(JSON.parse(fileRes.data))
          this.from.avatar = JSON.parse(fileRes.data)

        }
      });
    }
  }
}
</script>

<style scoped>
page {
  background-color: white;
}
/deep/.van-field__label--disabled {
  color: #646566 !important;
}
/deep/.van-field__control--disabled {
  color: #646566 !important;
}



.avatar-style {
  border: 0px solid #fff;
  height: 80px;
  width: 80px;
  border-radius: 50%;
  padding: 0;
  background: #eee;
  margin: 0;
}
</style>
