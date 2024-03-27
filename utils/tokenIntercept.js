//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页。
// 页面白名单，不受拦截
const whiteList = [
	'/pages/home/home'
]
function hasPermission (url) {
	url=url.split('?')[0]
//这个是你存到本地的token  这里是你的名字
  //let islogin = uni.getStorageSync("login").token;
  wx.getStorage({
    key: "userInfo",
    success(res) {
      that.data.user=JSON.parse(res.data)
      console.log(that.data.user)
      return ture
    }
  })
  //islogin = Boolean(islogin);//返回布尔值
	// console.log(islogin,"是否登录");
    // 在白名单中或有登录判断条件可以直接跳转
		// console.log(whiteList.includes(url),whiteList.indexOf(url) !== -1);
    if(whiteList.includes(url) ) {//如果查到是白名单就为true，如果没有查到，登录了，也是true
        return true
    }
    return false
}
uni.addInterceptor('navigateTo', {
    // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
    invoke (e) {
			// console.log(e,"路由拦截");
        if(!hasPermission(e.url)){
            uni.navigateTo({
                url: '/pages/1oginPage/1oginPage'
            })
            return false
        }
        return true
    },
    success (e) {
			// console.log(e,'响应拦截');
    }
})
//使用 这个 uniapp中的api 
uni.addInterceptor('switchTab', {
    // tabbar页面跳转前进行拦截
    invoke (e) {
			// console.log(e,"路由拦截");
        if(!hasPermission(e.url)){
            uni.navigateTo({
                  url: '/pages/1oginPage/1oginPage'
            })
            return false
        }
        return true
    },
    success (e) {
    }
})