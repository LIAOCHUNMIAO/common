import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'

import store from './store' // store
import plugins from './plugins' // plugins
import './permission' // permission



import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
Vue.use(plugins)
Vue.config.productionTip = false
Vue.prototype.$store = store

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif