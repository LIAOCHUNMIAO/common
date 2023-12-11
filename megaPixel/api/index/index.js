import request from '@/utils/request'
import config from '@/config'
// 通知
export function notice() {
    return request({
        'url': '/user/official/notice',
        'method': 'get'
    })
}

// 首页轮播图
export function album() {
    return request({
        'url': '/user/official/album',
        'method': 'get'
    })
}

// 店家-首页
export function studio(id) {
    return request({
        'url': '/user/studio/'+id,
        'method': 'get'
    })
}

// 店家-摄影棚预约列表
export function allScenery(id) {
    return request({
        'url': '/user/studio/'+id+ '/scenery/all',
        'method': 'get'
    })
}
// 店家-摄影棚详情
export function sceneryDetails(id) {
    return request({
        'url': '/user/scenery/'+id,
        'method': 'get'
    })
}

// 所有订单
export function allOrder() {
    return request({
        'url': '/user/order/all',
        'method': 'get'
    })
}

// 搜索-所有店铺
export function allStudio(params) {
    return request({
        'url': '/user/studio/all', // /user/studio/all/query /user/studio/all
        'method': 'get',
        params
    })
}

export function allStudioByParam(params) {
    return request({
        'url': '/user/studio/all/query', // /user/studio/all/query /user/studio/all
        'method': 'get',
        params
    })
}
// 我的会员
export function allMembership() {
    return request({
        'url': '/user/membership/all',
        'method': 'get'
    })
}
// http://120.55.84.243:8000/user/studio/2/membership

export function membershipByStudioId(studioId) {
    return request({
        'url': '/user/studio/'+studioId+'/membership',
        'method': 'get'
    })
}
export function rental(studioId) {
    return request({
        'url': '/user/studio/'+studioId+'/rental',
        'method': 'get'
    })
}



export function booking(id,data) {
    return request({
        'url': `/user/scenery/${id}/booking`,
        'method': 'post',
        'data': data
    })
}

export function order(id,data) {
    return request({
        'url': `/user/scenery/${id}/order`,
        'method': 'post',
        'data': data
    })
}


export function auth(data) {
    return request({
        'url': '/auth/wechat',
        headers: {
            isToken: false
        },
        'method': 'post',
        'data': data
    })
}

export function userInfo() {
    return request({
        'url': '/user/userInfo',
        'method': 'get'
    })
}
export function getPhone(params) {
    return request({
        'url': '/auth/phone',
        headers: {
            isToken: false
        },
        'method': 'get',
        params
    })
}


export function updateInfo(data) {
    return request({
        'url': '/user/updateInfo',
        'method': 'post',
        'data': data
    })
}

export const uploadUrl = config.baseUrl+'/user/photo/upload'
