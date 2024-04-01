// app.js
// import '/utils/tokenIntercept.js';
const eventBus = require('./utils/eventBus')
App({
  eventBus: eventBus,
  changeUserRight() {
    const i = wx.getStorageSync('rightId') || 0
    const id = i === 0 ? 1 : 0
    wx.setStorageSync('rightId', id)
    getApp().eventBus.emit('rightChange', id)
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // wx.getStorage({
    //   key:"userInfo",
    //   success(res){
    //     console.log(res.data.data)
    //     if (res.data.data.identity === "teacher") {
    //       this.setTeacherTabBar(); // 设置教师身份的导航栏
    //     } else if (res.data.data.identity === "student") {
    //       this.setStudentTabBar(); // 设置学生身份的导航栏
    //     }
    //   }
    // })
  },
  globalData: {
    routerList:[],
    userInfo:[]
  },
  setTeacherTabBar: function () {
    wx.showTabBar(); // 显示新的 TabBar

    // 先清空原先的 TabBar 内容
    wx.hideTabBar({
      aniamtion: false // 关闭动画效果
    });
    wx.setTabBarItem({
      index: 0, // tabBar 中的哪一项，从左边算起
      text: '主页',
      iconPath: '/static/tabar/home.png',
      selectedIconPath: '/static/tabar/home-filling.png',
      pagePath: 'pages/homeTeacher/homeTeacher' // 对应的页面路径
    });

    wx.setTabBarItem({
      index: 1,
      text: '孩子',
      iconPath: '/static/tabar/baby.png',
      selectedIconPath: '/static/tabar/children.png',
      pagePath: 'pages/myChildren/myChildren'
    });

    wx.setTabBarItem({
      index: 2,
      text: '我的',
      iconPath: '/static/tabar/my.png',
      selectedIconPath: '/static/tabar/my_fill.png',
      pagePath: 'pages/my/my'
    });
  },

  // 设置学生身份的导航栏
  setStudentTabBar: function () {
    wx.setTabBarItem({
      index: 0,
      text: '主页',
      iconPath: '/static/tabar/home.png',
      selectedIconPath: '/static/tabar/home-filling.png',
      pagePath: 'pages/home/home'
    });

    wx.setTabBarItem({
      index: 1,
      text: '试卷',
      iconPath: '/static/tabar/paper.png',
      selectedIconPath: '/static/tabar/uf_paper.png',
      pagePath: 'pages/paper/paper'
    });

    wx.setTabBarItem({
      index: 2,
      text: '我的',
      iconPath: '/static/tabar/my.png',
      selectedIconPath: '/static/tabar/my_fill.png',
      pagePath: 'pages/my/my'
    });
  }
})

 
 