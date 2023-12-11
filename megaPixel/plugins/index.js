import tab from './tab'
import auth from './auth'
import modal from './modal'
import utils from './comUtils'

export default {
  install(Vue) {
    // 页签操作
    Vue.prototype.$tab = tab
    // 认证对象
    Vue.prototype.$auth = auth
    // 模态框对象
    Vue.prototype.$modal = modal
    // 常用工具
    Vue.prototype.$utils = utils
  }
}
