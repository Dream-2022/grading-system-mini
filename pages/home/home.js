// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:[]
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
  loginClick:function loginClick(){
    console.log("点击头像")
    var that=this
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.setData({
          user: JSON.parse(res.data)
        });
        console.log(that.data.user)
        if(JSON.stringify(that.data.user) === JSON.stringify([])){
          wx.navigateTo({
            url: '/pages/loginPage/loginPage',
            success:function(res){
              wx.showToast({
                title: "请先登录账号", // 提示的内容
                icon: "none", // 图标，默认success
                image: "", // 自定义图标的本地路径，image 的优先级高于 icon
                duration: 1500, // 提示的延迟时间，默认1500
                mask: false
            })
            },
            fail:function(error){
            }
          })
        }else{
          wx.switchTab({
            url: '/pages/my/my',
            success:function(res){
              console.log("跳转到my页面")
            },
            fail:function(error){
            }
          })
        }
      },
      fail(res){
        console.log(res.data)
        wx.navigateTo({
          url: '/pages/loginPage/loginPage',
          success:function(res){
            console.log("跳转到loginPage页面")
            wx.showToast({
              title: "请先登录账号", // 提示的内容
              icon: "none", // 图标，默认success
              image: "", // 自定义图标的本地路径，image 的优先级高于 icon
              duration: 1500, // 提示的延迟时间，默认1500
              mask: false
            })
          },
          fail:function(error){
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that =this
    wx.getStorage({
      key: "userInfo",
      success(res) {
        console.log(JSON.parse(res.data))
        that.data.user=JSON.parse(res.data)
        console.log(that.data.user)
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