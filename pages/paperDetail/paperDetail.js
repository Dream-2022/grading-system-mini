// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paperDetail:[],//一页试卷
    paper:[],//试卷分数，名称等详细
    user:[],
    problemList:[],
    pageNum: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    wx.getStorage({
      key:"paper",
      success(res){
        console.log(res.data)
        that.setData({
          paper: res.data
        })
      }
    })
    wx.getStorage({
      key:"userInfo",
      success(res){
        that.data.user=JSON.parse(res.data)
        wx.getStorage({
        key:"paperId",
        success(res){
          var paperId=res.data
          console.log(res.data)
          //获取试卷详细信息
          wx.request({
            url: "http://10.251.23.120:8084/examPaper/getPages",
            header:{
              "Authorization": that.data.user.shortToken,
              'content-type': 'application/json' // 默认值
            },
            data:{
              "examPaperId": paperId
            },
            method: 'GET',
            success (res) {
              console.log(res.data.data)
              that.setData({
                paperDetail:res.data.data
              })
              let newStr=that.data.paperDetail[that.data.pageNum].content.replaceAll('\n','')
              newStr=that.data.paperDetail[that.data.pageNum].content.replaceAll('\'','\"')
              console.log(JSON.parse(newStr))
              that.setData({
                problemList: JSON.parse(newStr)
              })
            }
          }) 
        }
      })
      }
    })

  },
  //点击向前翻页
  forwardClick: function(){
    if(this.data.pageNum==1){
      wx.showToast({
        title: "已经是第一页", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
      return
    }
    //获取前一张试卷和题目
    this.setData({
      pageNum: this.data.pageNum-1
    })
    let newStr=this.data.paperDetail[this.data.pageNum-1].content.replaceAll('\n','')
    newStr=this.data.paperDetail[this.data.pageNum-1].content.replaceAll('\'','\"')
    console.log(JSON.parse(newStr))
    this.setData({
      problemList: JSON.parse(newStr)
    })
  },
  //点击向后翻页
  backClick: function(){
    if(this.data.pageNum==this.data.paperDetail.length){
      wx.showToast({
        title: "已经是最后一页", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
      return
    }
    //获取后一张试卷和题目
    this.setData({
      pageNum:  this.data.pageNum+1
    })
    console.log(this.data.paperDetail)
    console.log(this.data.pageNum)
    console.log(this.data.paperDetail[this.data.pageNum-1])
    let newStr=this.data.paperDetail[this.data.pageNum-1].content.replaceAll('\n','')
    newStr=this.data.paperDetail[this.data.pageNum-1].content.replaceAll('\'','\"')
    console.log(JSON.parse(newStr))
    this.setData({
      problemList: JSON.parse(newStr)
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