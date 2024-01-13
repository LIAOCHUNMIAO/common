import {getToken,removeToken} from '@/utils/auth'
import constant from '@/utils/constant'
// // 登录页面
// const loginPage = "/pages/index/index"
//
// // 页面白名单
const whiteList = [
    '/pages/index/index'
]
//
// // 检查地址白名单
// function checkWhite(url) {
//   const path = url.split('?')[0]
//   return whiteList.indexOf(path) !== -1
// }

// // 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
    uni.addInterceptor(item, {
        invoke(to) {
            return true
            // console.log('shg')
            // console.log(to)
            // if (whiteList.includes(to.url)) {
            //     console.log('首页')
            //     return true
            // } else {
            //     console.log('!首页')
            //     if (getToken()) {
            //         console.log('token')
            //         return true
            //     } else {
            //         uni.setStorageSync(constant.userPhone,'')
            //         removeToken()
            //         this.$modal.msg("登录信息过期，请重新登录")
            //         return false
            //     }
            //
            // }

            // if (getToken()) {
            //   if (to.url === loginPage) {
            //     uni.reLaunch({ url: "/" })
            //   }
            //   return true
            // } else {
            //   if (checkWhite(to.url)) {
            //     return true
            //   }
            //   uni.reLaunch({ url: loginPage })
            //   return false
            // }
        },
        fail(err) {
            console.log(err)
        }
    })
})
