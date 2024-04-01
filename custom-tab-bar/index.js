import {USER_PAGE} from "../static/common"
Component({
  data: {
    selected: 0,
    color: "#fff", 
    selectedColor: "#fff",
    backgroundColor: "#7990e0",
    list: [
      // {
      //   "pagePath": "pages/home/home",
      //   "text": "主页",
      //   "iconPath": "/static/tabar/home.png",
      //   "selectedIconPath": "/static/tabar/home-filling.png"
      // },
      // {
      //   "pagePath": "pages/paper/paper",
      //   "text": "试卷",
      //   "iconPath": "/static/tabar/paper.png",
      //   "selectedIconPath": "/static/tabar/uf_paper.png"
      // },
      // {
      //   "pagePath": "pages/my/my",
      //   "text": "我的",
      //   "iconPath": "/static/tabar/my.png",
      //   "selectedIconPath": "/static/tabar/my_fill.png"
      // }
    ],
    userInfo: []
  },
  attached() {
    var that=this
    wx.getStorage({
      key:"userInfo",
      success(res){
        console.log(res.data)
        var userInfo=JSON.parse(res.data)
        if(userInfo.identity === "parents"){
          console.log("parents")
          that.setData({
            list: USER_PAGE.parentTabbarList
          })
        }else if(userInfo.identity === "student"){
          console.log("student")
          that.setData({
            list: USER_PAGE.studentTabbarList
          })

          console.log(that.data.list)
        }
        // console.log(that.data.list)
      }
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})