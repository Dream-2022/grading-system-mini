import {USER_PAGE} from "../static/common"
Component({
  data: {
    selected: 0,
    color: "#fff", 
    selectedColor: "#fff",
    backgroundColor: "#7990e0",
    list: [],
    userInfo: []
  },
  attached() {
    var that=this
    wx.getStorage({
      key:"userInfo",
      success(res){
        console.log("获取成功")
        console.log(res.data)
        var userInfo=JSON.parse(res.data)
        console.log(userInfo.identity)
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
        console.log(that.data.list)
      },
      fail(res){
        console.log("获取失败")
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