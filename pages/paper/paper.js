// pages/paper/paper.js
import { getMyAllE } from '/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    paperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    var that=this
    wx.getStorage({
      key: "userInfo",
      success(res) {
        console.log(JSON.parse(res.data))
        that.data.user=JSON.parse(res.data)
        console.log(that.data.user)
        sendRequestWithUserInfo(that.data.user,that)
      }
    })
    function  sendRequestWithUserInfo(userInfo,that){
      wx.request({
        url: 'http://192.168.50.24:8084/examPaper/getMyAllE',
        // data: {
        //   userId: 1
        // },
        header:{
          "Authorization": userInfo.shortToken,
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success (res) {
          console.log(res.data.data)
          that.data.paperList=res.data.data
        }
      }) 
    }
    
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