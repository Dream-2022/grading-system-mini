// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toRelationship:function toRelationship(){
    wx.navigateTo({
      url: '/pages/relationship/relationship',
      success:function(res){
      },
      fail:function(error){
      }
    })
  },
  toNotice:function toNotice(){
    wx.navigateTo({
      url: '/pages/notice/notice',
      success:function(res){
      },
      fail:function(error){
      }
    })
  },
  toWenXin:function toWenXin(){
    wx.navigateTo({
      url: '/pages/wenXin/wenXin',
      success:function(res){
      },
      fail:function(error){
      }
    })
  },
  toPaper:function toPaper(){
    wx.switchTab({
      url: '/pages/paper/paper',
    })
  },
  toAnalysis:function toAnalysis(){
    wx.navigateTo({
      url: '/pages/analysis/analysis',
      success:function(res){
      },
      fail:function(error){
      }
    })
  },
  toHistory:function toHistory(){
    wx.navigateTo({
      url: '/pages/history/history',
      success:function(res){
      },
      fail:function(error){
      }
    })
  },
  toMy:function toMy(){
    wx.switchTab({
      url: '/pages/my/my',
    })
  },
  toWrong:function toWrong(){
    wx.navigateTo({
      url: '/pages/wrong/wrong',
      success:function(res){
      },
      fail:function(error){
      }
    })
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