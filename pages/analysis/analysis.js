// pages/analysis/analysis.js
import * as echarts from '../../ec-canvas/echarts';
var chart = null;
function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  wx.getStorage({
    key: "historyXDataList",
    success(res) {
      var historyXDataList=res.data
      wx.getStorage({
        key: "userInfo",
        success(res) {
          var userInfo=JSON.parse(res.data)
          console.log(userInfo)
          wx.getStorage({
            key: "historyScoreDataList",
            success(res) {
              var historyScoreDataList=res.data
              console.log(historyXDataList,historyScoreDataList)
              var option = {
                title: {
                  text: userInfo.name+'成绩历次分布',
                  left: 'center'
                },
                dataZoom: [{
                        type: 'slider', //1平移 缩放
                        throttle: '50', //设置触发视图刷新的频率。单位为毫秒（ms）。
                        minValueSpan: 6, //用于限制窗口大小的最小值,在类目轴上可以设置为 5 表示 5 个类目
                        start: 1, //数据窗口范围的起始百分比 范围是：0 ~ 100。表示 0% ~ 100%。
                        end: 50, //数据窗口范围的结束百分比。范围是：0 ~ 100。
                        zoomLock: false, //如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
                }],
                legend: {
                  data: [userInfo.name],
                  top: 50,
                  left: 'center',
                  backgroundColor: 'white',
                  z: 100
                },
                grid: {
                  containLabel: true
                },
                tooltip: {
                  show: true,
                  trigger: 'axis'
                },
                xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: historyXDataList,
                  // show: false
                },
                yAxis: {
                  x: 'center',
                  type: 'value',
                  splitLine: {
                    lineStyle: {
                      type: 'dashed'
                    }
                  }
                  // show: false
                },
                series: [{
                  name: userInfo.name,
                  type: 'line',
                  smooth: true,
                  data: historyScoreDataList
                }]
              };
              chart.setOption(option);
            }
          })
        }
      })
    }
  })
 
  return chart;
}
function initChart1(canvas, width, height,dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr 
  });
  canvas.setChart(chart);
  wx.getStorage({
    key: "userInfo",
    success(res) {
      var userInfo=JSON.parse(res.data)
      wx.getStorage({
        key: "stateList",
        success(res) {
          var stateList=JSON.parse(res.data)
          console.log(stateList)
          var option = {
            title: {
              text: userInfo.name+'成绩评定状况',
              left: 'center'
            },
            tooltip: {
              trigger: 'item',
            },
            legend: {
              bottom: 10,
              left: 'center',
              data: [ '优秀', '良好', '及格', '不及格']
            },
            series: [
              {
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: stateList,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
        
          chart.setOption(option);
        }
      })

    }
  })

  return chart;
}                
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },                   
  /**
   * 页面的初始数据
   */                
  data: {
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1 
    },
    historyList:[],
    stateList:[],
    user: [],
    historyXDataList:[],
    historyScoreDataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that=this
    wx.getStorage({
      key: "userInfo",
      success(res){
        that.setData({
          user: JSON.parse(res.data)
        })
        sendMockWithStage(that)
        sendMockWithHistory(that)
      }
    })
    function sendMockWithHistory(that){
      wx.request({
        url: "http://10.251.23.120:8084/examAnalysis/my-score-history/"+that.data.user.account,
        header:{
          "Authorization": that.data.user.shortToken,
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success (res) {
          console.log(res.data.data)
          wx.setStorage({
            key: "historyXDataList",
            data: res.data.data.map(item => item.examName),
          })
          wx.setStorage({
            key: "historyScoreDataList",
            data: res.data.data.map(item => item.score),
          })
          that.setData({
            historyList:res.data.data
          }, function () {
            console.log(that.data.historyList)
            wx.setStorage({
              key: "historyList",
              data: JSON.stringify(that.data.historyList),
              success(res) {
              }
            })
          })
        }
      }) 
      console.log(that.data.historyList)
    }
    function sendMockWithStage(that){
      wx.request({
        url: "http://10.251.23.120:8084/examAnalysis/my-score-stage/"+that.data.user.account,
        header:{
          "Authorization": that.data.user.shortToken,
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success (res) {
          console.log(res.data.data)
          that.setData({
            stateList:res.data.data
          }, function () {
            console.log(that.data.stateList)
            wx.setStorage({
              key: "stateList",
              data: JSON.stringify(that.data.stateList),
            })
          })
        }
      })
      console.log(that.data.stateList)
    }
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
  onShareAppMessage(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  }
})

