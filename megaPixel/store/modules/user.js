import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import myConstant from "@/utils/myConstant";
import { getToken, setToken, removeToken } from '@/utils/auth'
import {auth,userInfo} from '@/api/index'
const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions),
    province:storage.get(constant.province),
    phone:storage.get(constant.phone),
    hasPhone:storage.get(constant.hasPhone),
    gender:storage.get(constant.gender),
    // gender: "0"
    // growth: null
    // id: 8
    // name: "微信用户"
    // openid: "ocOmn4l-aT_HKMv79rn2MX8idPDA"
    // phone: "13620517763"
    // province: "上海"
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    },
    SET_PROVINCE: (state, province) => {
      state.province = province
      storage.set(constant.province, province)
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
      storage.set(constant.phone, phone)
    },
    SET_HAS_PHONE: (state, hasPhone) => {
      state.hasPhone = hasPhone
      storage.set(constant.hasPhone, hasPhone)
    },
    SET_GENDER: (state, gender) => {
      state.gender = gender
      storage.set(constant.gender, gender)
    },

  },

  actions: {
    AutoLogin({ commit },info) {

      return new Promise((resolve, reject) => {
        auth(info).then(res =>{
          setToken(res.accessToken)
          commit('SET_TOKEN',res.accessToken)
          resolve(true)
        })

      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userInfo().then(res => {
          let {avatar, code, gender, name, phone, province} = res
          myConstant.genderType.forEach(item => {
            if (gender === item.id || gender === item.name){
              gender = item.name
            }
          })

          commit('SET_NAME', name)
          commit('SET_PROVINCE', province)
          commit('SET_PHONE', phone)
          commit('SET_AVATAR', avatar)
          commit('SET_GENDER', gender)
          let has = false
          if (phone !== null && phone!== ""&& phone!== undefined){
            has = true
          }
          commit('SET_HAS_PHONE',has)


          resolve({status:true,info:res})
        }).catch(error => {
          reject({status:true,info:error})
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        removeToken()
        storage.clean()
        resolve()
      })
    }
  }
}

export default user
