// pages/ai/ai.js
var wxCharts = require("../../utils/wxchart.js");
var yuelineChart=null;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user:[],
    childrenList: [],
    selectArray: [],
    selectValue: '选择',
    historyXDataList: [],
    historyScoreDataList: [],
    stateList: [],
    flagChart:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    //判断是否登录
    wx.getStorage({
      key: "userInfo",
      success(res) {
        that.setData({
          user: JSON.parse(res.data)
        });
        console.log(that.data.user)
        if(JSON.stringify(that.data.user) === JSON.stringify([])){
          wx.redirectTo({
            url: '/pages/loginPage/loginPage',
            success:function(res){
            },
            fail:function(error){
            }
          })
        }

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
          }
        })
      },
      fail(res){
        console.log(res.data)
        wx.redirectTo({
          url: '/pages/loginPage/loginPage',
          success:function(res){
            console.log("跳转到loginPage页面")
          },
          fail:function(error){
          }
        })
      }
    })

  },
  pickerChange : function(e){
    var index=e.detail.value
    console.log(e.detail)
    console.log(index)
    this.setData({
      selectValue:this.data.selectArray[index]
    })
    //显示图表
    sendMockWithHistory(this)
    sendMockWithStage(this)
    function sendMockWithHistory(that){
      console.log(that.data.childrenList)
      console.log(that.data.childrenList[index])
      console.log(that.data.childrenList[index].account)
      wx.request({
        url: "http://10.251.23.120:8084/examAnalysis/my-score-history/"+that.data.childrenList[index].account,
        header:{
          "Authorization": that.data.user.shortToken,
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success (res) {
          that.setData({
            historyXDataList:res.data.data.map(item => item.examName),
            historyScoreDataList:res.data.data.map(item => item.score)
          }, function () {
            console.log(that.data.historyXDataList,that.data.historyScoreDataList)
          })
          console.log(that.data.historyScoreDataList)
          console.log(that.data.historyXDataList)
          var windowWidth = 320;
          try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
          } catch (e) {
            console.error('getSystemInfoSync failed!');
          }
          console.log(that.data.historyXDataList)
          console.log(that.data.historyScoreDataList)
          yuelineChart = new wxCharts({ //当月用电折线图配置
            canvasId: 'yueEle',
            type: 'line', 
            categories: that.data.historyScoreDataList, //categories X轴
            animation: true,
            series: [{
              name: that.data.childrenList[index].name,
              data: that.data.historyScoreDataList,
              format: function (val, name) {
                return val + '';
              }
            }],
            xAxis: {
              disableGrid: true
            },
            yAxis: {
              title: '数值',
              format: function (val) {
                return val;
              },
              /*max: 20,*/
              min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            extra: {
              lineStyle: 'curve'
            }
          });
        }
      })


    }
    function sendMockWithStage(that){
      wx.request({
        url: "http://10.251.23.120:8084/examAnalysis/my-score-stage/"+that.data.childrenList[index].account,
        header:{
          "Authorization": that.data.user.shortToken,
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success (res) {
          wx.setStorage({
            key:"stateList",
            data:res.data.data
          })
          that.setData({
            stateList:res.data.data
          }, function () {
            console.log(that.data.stateList)
          })
        }
      })
    }
    this.setData({
      flagChart:true
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
        selected: 0
      })
    }
    var windowWidth = 320;
    if(this.data.flagChart==false){
      console.log("没有点击孩子")
      return;
    }
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    yuelineChart = new wxCharts({ //当月用电折线图配置
      canvasId: 'yueEle',
      type: 'line',
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'], //categories X轴
      animation: true,
      series: [{
        name: 'A',
        data: [1, 6, 9, 1, 0, 2, 9, 2, 8, 6, 0, 9, 8, 0, 3, 7, 3, 9, 3, 8, 9, 5, 4, 1, 5, 8, 2, 4, 9, 8, 7],
        format: function (val, name) {
          return val + '';
        }
      }, {
        name: 'B',
        data: [0, 6, 2, 2, 7, 6, 2, 5, 8, 1, 8, 4, 0, 9, 7, 2, 5, 2, 8, 2, 5, 2, 9, 4, 4, 9, 8, 5, 5, 5, 6],
        format: function (val, name) {
          return val + '';
        }
      }, ],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '数值',
        format: function (val) {
          return val;
        },
        /*max: 20,*/
        min: 0
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
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