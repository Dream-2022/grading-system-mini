// pages/ai/ai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    user:[]
  },
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },
  loginClick: function loginButton(){
    //发送登录请求
    console.log(this.data.password)
    console.log(this.data.username)
    wx.request({
      url: 'http://192.168.50.150:8084/user/login',
      data: {
        account:this.data.username,
        password:this.data.password
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {//18734848
        console.log(res.data)
        console.log(res.data.data)
        console.log(res.header['Authorization'])
        console.log(res.header['Authorization-refresh'])
        var userInfo=[]
        userInfo=res.data.data
        userInfo.shortToken=res.header['Authorization']
        //uni.setStorageSync("shortToken",res.header['Authorization'])
        userInfo.refreshToken=res.header['Authorization-refresh']
        //uni.setStorageSync("refreshToken",res.header['Authorization-refresh'])
        console.log(userInfo)
        wx.setStorage({
          key: "userInfo",
          data: JSON.stringify(userInfo),
          success(res) {
            console.log(res)
            wx.showToast({
              title: "登录成功", // 提示的内容
              icon: "success", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 1500, // 提示的延迟时间，默认1500
              mask: false, // 是否显示透明蒙层，防止触摸穿透
            })
            wx.switchTab({
              url: '/pages/home/home',
              success:function(res){
                console.log(res)
              },
              fail:function(error){
                console.log(error)
              }
            })
          }
        })
        
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.user)
    var that = this;
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.data.user=JSON.parse(res.data)
        console.log(that.data.user)
      }
    })
    console.log(this.data.user)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})