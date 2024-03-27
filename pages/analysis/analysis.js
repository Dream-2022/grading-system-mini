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
  var option = {
    title: {
      text: '裴雨孜成绩历次分布',
      left: 'center'
    },
    legend: {
      data: ['裴雨孜', 'B', 'C'],
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
      data: ['第一次月考', '第二次月考', '第三次月考', '第四次月考', '第五次月考', '第六次月考', '第七次月考'],
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
      name: '裴雨孜',
      type: 'line',
      smooth: true,
      data: [90, 85, 65, 84, 80, 92, 82]
    }
    // , {
    //   name: 'B',
    //   type: 'line',
    //   smooth: true,
    //   data: [12, 50, 51, 35, 70, 30, 20]
    // }, {
    //   name: 'C',
    //   type: 'line',
    //   smooth: true,
    //   data: [10, 30, 31, 50, 40, 20, 10]
    // }
    ]
  };
 
  chart.setOption(option);
  return chart;
}
function initChart1(canvas, width, height,dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr 
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '裴雨孜成绩评定状况',
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
        data: [
          {value: 1548,name: '优秀',},
          { value: 735, name: '良好' },
          { value: 510, name: '及格' },
          { value: 434, name: '不及格' }
        ],
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
    stateList:[],
    historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  onShow(options){
    sendMockWithStage(this)
    sendMockWithHistory(this)
    function sendMockWithStage(that){
      var API = require('../../static/mock/analysis/myScoreStage.js')
      console.log('onLoad')
      // 使用 Mock
      API.ajax('', function (res) {
          console.log(res)
          that.setData({
            stateList:res.data
          }, function () {
            console.log(that.data.stateList)
            wx.setStorage({
              key: "stateList",
              data: JSON.stringify(that.data.stateList),
              success(res) {
              }
            })
          })
      });
      console.log(that.data.stateList)
    }
    function sendMockWithHistory(that){
      var API = require('../../static/mock/analysis/myScoreHistory.js')
      console.log('onLoad')
      // 使用 Mock
      API.ajax('', function (res) {
          console.log(res)
          that.setData({
            historyList:res.data
          }, function () {
            console.log(that.data.historyList)
            wx.setStorage({
              key: "historyList",
              data: JSON.stringify(that.data.historyList),
              success(res) {
              }
            })
          })
      });
      console.log(that.data.historyList)
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

