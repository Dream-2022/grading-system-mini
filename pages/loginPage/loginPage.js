// pages/ai/ai.js
const app = getApp().globalData  
Page({
  /**
   * 页面的初始数据
   */
  data: {
    rightId:wx.getStorageSync('userInfo') || 0,
    username: '',
    password: '',
    user:[],
    list: [],
    list1: [{//教师
      "pagePath": "pages/homeTeacher/homeTeacher",
      "text": "主页",
      "iconPath": "/static/tabar/home.png",
      "selectedIconPath": "/static/tabar/home-filling.png"
    },
    {
      "pagePath": "pages/myChildren/myChildren",
      "text": "孩子",
      "iconPath": "/static/tabar/baby.png",
      "selectedIconPath": "/static/tabar/children.png"
    },
    {
      "pagePath": "pages/my/my",
      "text": "我的",
      "iconPath": "/static/tabar/my.png",
      "selectedIconPath": "/static/tabar/my_fill.png"
    }
    ],
    list2: [{//学生
      "pagePath": "pages/home/home",
      "text": "主页",
      "iconPath": "/static/tabar/home.png",
      "selectedIconPath": "/static/tabar/home-filling.png"
    },
    {
      "pagePath": "pages/paper/paper",
      "text": "试卷",
      "iconPath": "/static/tabar/paper.png",
      "selectedIconPath": "/static/tabar/uf_paper.png"
    },
    {
      "pagePath": "pages/my/my",
      "text": "我的",
      "iconPath": "/static/tabar/my.png",
      "selectedIconPath": "/static/tabar/my_fill.png"
    }
    ]
  },
  attached() {
    this.changeList()
    getApp().eventBus.on('rightChange', data => {
      if (data !== this.data.rightId) {
        this.setData({
          rightId: data
        })
        this.changeList()
      }
    })
  },
  detached() {
    app.eventBus.off('rightChange')
  },
  methods: {
    changeList() {
      this.setData({
        rightId: wx.getStorageSync('rightId') || 0
      })
      if (this.data.rightId === 1) {
        this.setData({
          list: this.data.list2
        })
      } else {
        this.setData({
          list: this.data.list1
        })
      }
    },
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url })
    }
  },
  //两个监听输入框的函数
  inputUsername(e) {
    this.setData({
      username: e.detail.value
    });
  },
  inputPassword(e) {
    this.setData({
      password: e.detail.value
    });
  },
  //点击登录
  loginClick: function loginButton(){
    if(this.data.password==""||this.data.username==""){
      wx.showToast({
        title: "输入内容不能为空", // 提示的内容
        icon: "none", // 图标，默认success
        image: "", // 自定义图标的本地路径，image 的优先级高于 icon
        duration: 1500, // 提示的延迟时间，默认1500
        mask: false, // 是否显示透明蒙层，防止触摸穿透
      })
      return
    }
    //发送登录请求
    console.log(this.data.password)
    console.log(this.data.username)
    wx.request({//12345678
      url: 'http://192.251.23.120:8084/user/login',
      data: {//18734848
        account:this.data.username,
        password:this.data.password
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
        console.log(res.data.data)
        console.log(res.header['Authorization'])
        console.log(res.header['Authorization-refresh'])
        var userInfo=[]
        userInfo=res.data.data
        userInfo.shortToken=res.header['Authorization']
        userInfo.refreshToken=res.header['Authorization-refresh']
        wx.setStorage({
          key: "userInfo",
          data: JSON.stringify(userInfo)
        })
        wx.showToast({
          title: "登录成功", // 提示的内容
          icon: "success", // 图标，默认success
          image: "", // 自定义图标的本地路径，image 的优先级高于 icon
          duration: 1500, // 提示的延迟时间，默认1500
          mask: false, // 是否显示透明蒙层，防止触摸穿透
        })
        //判断用户身份
        if(userInfo.identity == "teacher"){    //教师
          console.log("教师")
          console.log(app)
          app.routerList = [
            {
              "pagePath": "pages/homeTeacher/homeTeacher",
              "text": "主页",
              "iconPath": "/static/tabar/home.png",
              "selectedIconPath": "/static/tabar/home-filling.png"
            },
            {
              "pagePath": "pages/myChildren/myChildren",
              "text": "孩子",
              "iconPath": "/static/tabar/baby.png",
              "selectedIconPath": "/static/tabar/children.png"
            },
            {
              "pagePath": "pages/my/my",
              "text": "我的",
              "iconPath": "/static/tabar/my.png",
              "selectedIconPath": "/static/tabar/my_fill.png"
            }
          ]
          wx.reLaunch({
            url: '/pages/homeTeacher/homeTeacher',
          })
        }else if(userInfo.identity == "student"){   //学生
          wx.reLaunch({
            url: '/pages/home/home',
          })
        wx.switchTab({
          url: '/pages/home/home',
          success:function(res){
            console.log(res)
          },
          fail:function(error){
            console.log(error)
          }
        })
        }else{
          wx.showToast({
            title: "暂未开放该身份的小程序端", // 提示的内容
            icon: "none", // 图标，默认success
            image: "", // 自定义图标的本地路径，image 的优先级高于 icon
            duration: 1500, // 提示的延迟时间，默认1500
            mask: false, // 是否显示透明蒙层，防止触摸穿透
          })
        }
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.user)
    var that = this;
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.data.user=JSON.parse(res.data)
        console.log(that.data.user)
      }
    })
    console.log(this.data.user)
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
      console.log(this.getTabBar())
      this.getTabBar().setData({
        active: 1        //这里的active的值根据你的routerList 顺序一致
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