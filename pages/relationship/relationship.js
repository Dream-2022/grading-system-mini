// pages/relationship/relationship.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  agreeButton: function(){
    wx.showToast({
        title: "绑定成功", // 提示的内容
        icon: "success", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
        success: function () {console.log("接口调用成功的回调函数");},
        fail: function () {console.log("接口调用失败的回调函数");},
        complete: function () {console.log("接口调用结束的回调函数（调用成功、失败都会执行）");}
    })
  },
  rejectButton: function(){
    wx.showToast({
      title: "拒绝关系绑定", // 提示的内容
      icon: "none", // 图标，默认success
      image: "", // 自定义图标的本地路径，image 的优先级高于 icon
      duration: 1500, // 提示的延迟时间，默认1500
      mask: false, // 是否显示透明蒙层，防止触摸穿透
      success: function () {console.log("接口调用成功的回调函数");},
        fail: function () {console.log("接口调用失败的回调函数");},
        complete: function () {console.log("接口调用结束的回调函数（调用成功、失败都会执行）");}
  })
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