<script>
	  import config from './config'

	  import { getToken } from '@/utils/auth'
	  import {systemInfo} from '@/utils/myUtils.js' 
  export default {
    onLaunch: function() {
      uni.setStorageSync("start", true)
      this.initApp()
      // console.log('应用启动了')
    },
    onHide: function() {
      //
      // console.log('页面隐藏')
    },
    onShow: function() {
      // 页面显示
      // console.log('页面开始显示，可以多次执行')
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        // this.checkLogin()
        //#endif
      },
      initConfig() {
        this.globalData.config = config
		    this.globalData.config.systemInfo  = systemInfo()
        // 初始化北京地址
        this.globalData.config['longitude'] = 116.407526
        this.globalData.config['latitude'] = 39.904030

        const navTop = uni.getSystemInfoSync().statusBarHeight
        //获取小程序胶囊信息
        const menu = wx.getMenuButtonBoundingClientRect()
        //计算获得导航栏高度（此处为重点!!!）
        const navHeight = (menu.top - navTop) * 2 + menu.height

        this.globalData.config['navTop'] = navTop
        this.globalData.config['navHeight'] = navHeight
        this.globalData.config['contentTop'] = navTop+navHeight
        // this.handleAuthorize()
        // this.getMyLocal()
      },
      checkLogin() {
        // this.$tab.reLaunch('/pages/auth')
        // if (!getToken()) {
        //   this.$tab.reLaunch('/pages/auth')
        // }else {
        //   this.$tab.reLaunch('pages/index/index')
        // }
      },
      getMyLocal(){
        let _this = this
        uni.getLocation({
          type: 'gcj02', // wgs84  gcj02
          success:function(res){
            _this.globalData.config['longitude'] = res.longitude
            _this.globalData.config['latitude'] = res.latitude


          }
        })
      }



    }
  }
</script>

<style>
	/*每个页面公共css */
  .body{
    font-family: alim;
  }
</style>
<style lang="scss">
	@import "@/uni_modules/vant-weapp/common/index.wxss";
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/scss/index.scss'
</style>