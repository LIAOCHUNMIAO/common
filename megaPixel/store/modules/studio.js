import storage from '@/utils/storage'
import constant from '@/utils/constant'

const studio = {
    state: {
        studioWechatId: storage.get(constant.studioWechatId),
        studioPhone: storage.get(constant.studioPhone),
        studioId: storage.get(constant.studioId),
        studioName: storage.get(constant.studioName),
    },

    mutations: {
        SET_WECHAT_ID: (state, wechatId) => {
            state.wechatId = wechatId
            storage.set(constant.studioWechatId, wechatId)
        },
        SET_PHONE: (state, phone) => {
            state.phone = phone
            storage.set(constant.studioPhone, phone)
        },
        SET_STUDIO_ID: (state, studioId) => {
            state.studioId = studioId
            storage.set(constant.studioId, studioId)
        },
        SET_STUDIO_NAME: (state, studioName) => {
            state.studioName = studioName
            storage.set(constant.studioName, studioName)
        }
    },

    actions: {
        StudioInfo({commit}, info) {
            return new Promise((resolve, reject) => {
                commit('SET_WECHAT_ID', info.studioWechatId)
                commit('SET_PHONE', info.studioPhone)
                commit('SET_STUDIO_ID', info.studioId)
                commit('SET_STUDIO_NAME', info.studioName)
                resolve(true)

            })
        }
    }
}

export default studio