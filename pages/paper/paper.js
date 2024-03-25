// pages/paper/paper.js
//import { examPaperGetAllE } from '../../static/mock/paperGetMyAllE.js'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    paperList:[],
    selectArray:['全部试卷','已批阅','未批阅'],selectValue:'批阅状态'
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
        if(that.data.user!=null){
          //发送请求
          //sendRequestWithUserInfo(that.data.user,that)
          //mock数据
          sendMockWithUserInfo(that.data.user,that)
        }
        else{
          //如果没有登录，就跳转到登录页面
          wx.navigateTo({
            url: '/pages/loginPage/loginPage',
            success:function(res){
            },
            fail:function(error){
            }
          }) 
        }
      }
    })
    //发送请求
    // function  sendRequestWithUserInfo(userInfo,that){
    //   wx.request({
    //     url: 'http://192.168.50.24:8084/examPaper/getMyAllE',
    //     // data: {
    //     //   userId: 1
    //     // },
    //     header:{
    //       "Authorization": userInfo.shortToken,
    //       'content-type': 'application/json' // 默认值
    //     },
    //     method: 'GET',
    //     success (res) {
    //       console.log(res.data.data)
    //       that.setData({
    //         paperList: res.data.data
    //       });
    //     }
    //   }) 
    // }
    function sendMockWithUserInfo(userInfo,that){
      var API = require('../../static/mock/paperGetMyAllE.js')
      console.log('onLoad')
      // 使用 Mock
      API.ajax('', function (res) {
          console.log(res)
          that.setData({
            paperList:res.data
          }, function () {
            console.log(that.data.paperList)
          })
      });
      console.log(that.data.paperList)
    }
  },
  pickerChange : function(e){
    var index=e.detail.value
    console.log(e.detail)
    console.log(index)
    this.setData({
      selectValue:this.data.selectArray[index]
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