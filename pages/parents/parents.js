// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    parentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取我的家长
    var that =this
    wx.getStorage({
      key:"userInfo",
      success(res){
        that.setData({
          user: JSON.parse(res.data)
        })
        wx.request({
          url: "http://192.168.226.29:8084/user/getMyParents",
          header:{
            "Authorization": that.data.user.shortToken,
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          success (res) {
            console.log(res.data.data)
            that.setData({
              parentList:res.data.data
            })
          }
        }) 
      }
    })
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