// pages/paper/paper.js
import { getMyAllE } from '/api.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // const res = await this.getMyAllE('/examPaper/getMyAllE')
    //       if (res) {
    //       	console.log(res.data.data)
    //       }   
    wx.request({
      // url: 'http://127.0.0.1:8080/api/pre/remark/selectRemarkByUserId', 
      url: 'http://192.168.50.24:8084/examPaper/getAllE',
      // data: {
      //   userId: 1,
      //   orderIdValue:"",
      //   startTime:"",
      //   endTime:""
      // },
      // header:{
      //   token: '你保存的token值'
      // },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
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