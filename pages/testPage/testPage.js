// pages/ai/ai.js
var wxCharts = require("../../utils/wxchart.js");
var yuePieChart=null;

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  testClick: function(){
    console.log("点击")
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var windowWidth = wx.getSystemInfoSync().windowWidth; // 获取屏幕宽度

    // 使用wxCharts绘制饼状图
    yuePieChart = new wxCharts({
      canvasId: 'yuePie', // 在wxml中定义的canvas-id
      type: 'pie', // 图表类型为饼状图
      animation: true, // 启用动画效果
      animationDuration: 1000, // 设置动画持续时间为1000ms
      animationTiming: 'easeInOut', // 设置动画缓动效果为easeInOut
      series: [{
        name: '优秀',
        data: 5
      }, {
        name: '良好',
        data: 4
      }, {
        name: '及格',
        data: 1
      }, {
        name: '不及格',
        data: 2
      }],
      width: windowWidth, // 图表宽度，可以根据需求进行调整
      height: 300, // 图表高度，可以根据需求进行调整
      dataLabel: true, // 是否显示标签，默认为false
      dataPointShape: true, // 是否显示数据点图形，默认为true
      extra: {
        lineStyle: 'curve' // 额外配置，这里设置曲线样式，可根据需求修改
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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