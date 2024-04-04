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
    selectStateArray: ['全部试卷','已批阅','未批阅'],
    selectStateValue: '批阅状态',
    searchInput:"",//搜索框
    pageNum: 1,
    paperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    wx.getStorage({
      key:"userInfo",
      success(res){
        that.setData({
          user: JSON.parse(res.data)
        })
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
      }
    })
  },
  //点击选择小孩
  pickerChange : function(e){
    var index=e.detail.value
    this.setData({
      childrenIndex:index
    })
    console.log(e.detail)
    console.log(index)
    this.setData({
      selectValue:this.data.selectArray[index]
    })
    //获取小孩试卷
    console.log(this.data.childrenList[this.data.childrenIndex])
    this.sendMockWithUserInfo(this.data.childrenList[this.data.childrenIndex],this,"")
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
  //点击搜索试卷
  searchInputClick:function(){
    console.log(this.data.search)
    this.sendMockWithUserInfo(this.data.childrenList[this.data.childrenIndex],this,this.data.searchInput)
  },
  //搜索框的变化
  handleInput: function(e) {
    // 当输入框的值发生变化时，更新数据属性中的值
    this.setData({
      searchInput: e.detail.value
    });
  },
  //点击下拉框
  pickerStateChange : function(e){
    var index=e.detail.value
    console.log(e.detail)
    console.log(index)
    this.setData({
      selectStateValue:this.data.selectStateArray[index]
    })
  },
  //获取试卷函数
  sendMockWithUserInfo:function(userInfo,that,condition){
    wx.request({
      url: "http://10.251.23.120:8084/examPaper/getChildEByC",
      header:{
        "Authorization": this.data.user.shortToken,
        'content-type': 'application/json' // 默认值
      },
      data:{
        "condition":condition,
        "pageSize":5,
        "page":that.data.pageNum,
        "account":userInfo.account
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