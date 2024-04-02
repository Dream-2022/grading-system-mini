// pages/paper/paper.js
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
        console.log(JSON.stringify(that.data.user) === JSON.stringify([]))
        if(JSON.stringify(that.data.user) != JSON.stringify([])){
          //发送请求
          //sendRequestWithUserInfo(that.data.user,that)
          //mock数据
          sendMockWithUserInfo(that.data.user,that)
        }
        else{
          console.log('如果没有登录，就跳转到登录页面')
          //如果没有登录，就跳转到登录页面
          wx.redirectTo({
            url: '/pages/loginPage/loginPage',
            success:function(res){
            },
            fail:function(error){
            }
          }) 
        }
      },
      fail(err) {
        console.log("获取userInfo缓存失败");
        // 失败时也跳转到登录页面
        wx.redirectTo({
          url: '/pages/loginPage/loginPage',
          success: function(res) {
            console.log("跳转到登录页面成功");
            wx.showToast({
              title: "请先登录账号", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 1500, // 提示的延迟时间，默认1500
              mask: false
            })
          },
          fail: function(error) {
            console.error("跳转到登录页面失败", error);
          }
        });
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
      var API = require('../../static/mock/paper/paperGetMyAllE.js')
      console.log('onLoad')
      // 使用 Mock
      API.ajax('', function (res) {
          console.log(res)
          that.setData({
            paperList:res.data.data
          }, function () {
            console.log(that.data.paperList)
          })
      }, 'get', {},userInfo);
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
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("监听页面隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("监听页面卸载")
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