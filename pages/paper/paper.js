// pages/paper/paper.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    paperList:[],
    selectArray:['全部试卷','已批阅','未批阅'],
    selectValue:'批阅状态',
    pageNum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendMockWithUserInfo:function(userInfo,that,condition){
    wx.request({
      url: "http://10.251.23.120:8084/examPaper/getMyEByC",
      header:{
        "Authorization": userInfo.shortToken,
        'content-type': 'application/json' // 默认值
      },
      data:{
        "condition":condition,
        "pageSize":5,
        "page":that.data.pageNum
      },
      method: 'GET',
      success (res) {
        console.log(res.data.data)
        that.setData({
          paperList:res.data.data.list
        })
      }
    }) 
  },
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
          that.sendMockWithUserInfo(that.data.user,that,"")
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

  },
  //点击查询
  searchClick:function(){
    console.log(this.data.search)
    this.sendMockWithUserInfo(this.data.user,this,this.data.search)
  },
  //点击试卷
  paperBoxClick: function(event){
    wx.navigateTo({
      url: '/pages/paperDetail/paperDetail',
      success:function(res){
      },
      fail:function(error){
      }
    })
    var index = event.currentTarget.dataset.index;
    console.log('点击了 paperBox，传递的值为：', index);
    wx.setStorage({
      key:"paper",
      data:this.data.paperList[index]
    })
    wx.setStorage({
      key:"paperId",
      data:this.data.paperList[index].id
    })
  },
  noPaperBoxClick:function(){
    wx.showToast({
      title: "暂未完成批阅，请耐心等待", // 提示的内容
      icon: "none", // 图标，默认success
      image: "", // 自定义图标的本地路径，image 的优先级高于 icon
      duration: 1500, // 提示的延迟时间，默认1500
      mask: false, // 是否显示透明蒙层，防止触摸穿透
  })
  },
  //点击下拉框
  pickerChange : function(e){
    var index=e.detail.value
    console.log(e.detail)
    console.log(index)
    this.setData({
      selectValue:this.data.selectArray[index]
    })
  },
  //获取搜索输入框中的值
  handleInput: function(e) {
    // 当输入框的值发生变化时，更新数据属性中的值
    this.setData({
      search: e.detail.value
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