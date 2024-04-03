// pages/ai/ai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    childrenList: [],
    selectArray: [],
    selectValue: '选择',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
        //家长端获取小孩信息
        wx.request({
          url: 'http://10.251.23.120:8084/user/getMyChildren',
          method: 'GET',
          header: {
            "Authorization": that.data.user.shortToken,
            'content-type': 'application/json' // 默认值
          },
          success (res) {
            console.log(res.data.data)
            that.setData({
              selectArray: res.data.data.map(item => item.name),
              childrenList: res.data.data
            })
            if(that.data.selectArray.length==0){
              console.log(0)
              that.setData({
                selectValue: "暂未绑定小孩"
              })
            }
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