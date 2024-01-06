<template>
  <view>
    <comm-navbar title="编辑" :bgColor="'#ff8cad'" :title-color="'#fff'"  :is-top="true"></comm-navbar>
    <comm-empty/>
    <view>
      <form  @submit="formSubmit">

        <view style="padding: 20px;background: #fff">
          <view class="flex-center" style="flex-direction: column">
            <button class="avatar-style" open-type='chooseAvatar' @chooseavatar="getIcon">
<!--              <van-image-->
<!--                  round-->
<!--                  width="10rem"-->
<!--                  height="10rem"-->
<!--                  :src="avatarUrl"-->
<!--              />-->
              <image style="width: 100%;height: 100%;" :src="avatarUrl"/>
            </button>
            <view>头像</view>
          </view>

          <van-cell-group>
            <van-field
                :value="from.name"
                label="姓名"
                clearable
                placeholder="请输入姓名"
            />
            <van-field
                :value="from.gender"
                label="性别"
                clearable
                placeholder="请选择性别"
            >
              <van-button color="#faa1c7" slot="button" size="small" type="primary" @click="genderShow = true">
                选择性别
              </van-button>
            </van-field>

            <van-field
                :value="from.gender"
                label="地区"
                clearable
                placeholder="请选择地区"
            >
              <van-button color="#faa1c7" slot="button" size="small" type="primary" @click="cityShow = true">
                选择地区
              </van-button>
            </van-field>
          </van-cell-group>

        </view>
        <view style="position: fixed;bottom: 0;width: 100%">
          <view style="display: flex;align-items: center;height: 45px">
            <van-button style="flex-grow:1" color="#faa1c7" type="primary" block  formType="submit">提 交</van-button>
<!--            <button style="flex-grow: 1;background: #faa1c7;height: 100%;font-size: 17px;color: #fff;font-weight: bold"-->
<!--            formType="submit">提 交</button>-->
          </view>
        </view>
      </form>
    </view>
    <!-- 选择城市-->
    <u-popup :show="cityShow" @close="closeCity" :round="10">
      <view style="height: 350px;">
        <view style="display: flex;align-items:center; justify-content: space-between;margin: 5px 8px">
          <view style="width: 25px;height:25px;"></view>
          <view style="font-weight: bold">城市</view>
          <view @click="closeCity" style="font-size: 25px;padding-top: 2px;color: #8f8f8f"
                class="mega-pixel-icon icon-close"></view>
        </view>

        <view style="margin: 0px 5px;height: 100%;overflow-y: scroll">
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
        gender: "未知",
        province: "上海",
        avatar: null,
        name: null
      },
      cityShow: false,
      cityList: citys,
      genderShow: false,
      genderList: myConstant.genderType,
      avatarUrl: ''
    }
  },
  created() {
    this.avatarUrl = this.$store.getters.avatar
    this.from.name = this.$store.getters.name
    this.province = this.$store.getters.province

    this.genderList.forEach(i => {
      if (this.$store.getters.gender === i.id || this.$store.getters.gender === i.name) {
        this.from.gender = i.name
      }
    })
  },
  methods: {
    userNameInput(e){

      this.from.name = e.detail.value
    },
    formSubmit(e) {

      console.log(this.from)
      this.$modal.msgSuccess("提交成功！")
      updateInfo(this.from).then(res => {
        this.$store.dispatch('GetInfo')
        this.$tab.navigateBack()
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
