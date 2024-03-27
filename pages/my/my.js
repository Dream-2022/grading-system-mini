// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.setData({
          user: JSON.parse(res.data)
        });
        console.log(that.data.user)
        if(JSON.stringify(that.data.user) === JSON.stringify([])){
          wx.redirectTo({
            url: '/pages/loginPage/loginPage',
            success:function(res){
            },
            fail:function(error){
            }
          })
        }
      },
      fail(res){
        console.log(res.data)
        wx.redirectTo({
          url: '/pages/loginPage/loginPage',
          success:function(res){
            console.log("跳转到loginPage页面")
          },
          fail:function(error){
          }
        })
      }
    })
    
  },
  //点击退出登录
  exitLoginClick: function(){
    wx.removeStorageSync ("userInfo") 
    console.log("退出登录")
    wx.switchTab({
      url: '/pages/home/home',
      success: function(res) {
        wx.showToast({
          title: "注销成功", // 提示的内容
          icon: "success", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 1500, // 提示的延迟时间，默认1500
          mask: false
        })
      },
      fail: function(error) {
      }
    });
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