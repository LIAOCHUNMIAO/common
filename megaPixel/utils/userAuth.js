// wechat

export function getWechatAuth() {
    /*#ifdef MP-WEIXIN*/
   return  new Promise( (resolve, reject)=>{
        wx.getSetting({
            success (res) {
                const param = {
                    userInfo:res.authSetting['scope.userInfo'],
                    invoice:res.authSetting['scope.invoice'],
                    invoiceTitle:res.authSetting['scope.invoiceTitle'],
                    address:res.authSetting['scope.address'],
                    userLocation:res.authSetting['scope.userLocation']
                }
                resolve(param)
            }
        })
    })
    /*#endif*/
}

export function getWechatUserInfo() {
    /*#ifdef MP-WEIXIN*/
    return  new Promise( (resolve, reject)=>{
        wx.getUserInfo({
            success: function(res) {
                let userInfo = res.userInfo
                userInfo.gender =  userInfo.gender+''
                // console.log(userInfo)
                resolve(userInfo)

            }
        })

        // wx.getSetting({
        //     success (res) {
                // const param = {
                //     userInfo:res.authSetting['scope.userInfo'],
                //     invoice:res.authSetting['scope.invoice'],
                //     invoiceTitle:res.authSetting['scope.invoiceTitle'],
                //     address:res.authSetting['scope.address'],
                //     userLocation:res.authSetting['scope.userLocation']
                // }
                // resolve(param)
            // }
        // })
    })
    /*#endif*/
}

