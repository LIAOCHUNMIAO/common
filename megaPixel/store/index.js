import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'
import studio from '@/store/modules/studio'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    studio
  },
  getters
})

export default store
