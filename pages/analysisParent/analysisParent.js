// pages/ai/ai.js
var wxCharts = require("../../utils/wxchart.js");
var yuelineChart=null;
var yuePieChart=null;
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
    flagChart:false,
    childrenIndex:0
  },
  onChildrenClick:function(){
    wx.navigateTo({
      url: '/pages/testPage/testPage',
      success:function(res){
      },
      fail:function(error){
      }
    })
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
            if(that.data.selectArray.length==0){
              console.log(0)
              that.setData({
                selectValue: "暂未绑定小孩"
              })
            }
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
    this.setData({
      childrenIndex:index
    })
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
          wx.setStorage({
            key:"historyXDataList",
            data:res.data.data.map(item => item.examName),
            success(){
              wx.setStorage({
                key:"historyScoreDataList",
                data:res.data.data.map(item => item.score),
                success(){
                  var windowWidth = 320;
                  try {
                    var res = wx.getSystemInfoSync();
                    windowWidth = res.windowWidth;
                  } catch (e) {
                    console.error('getSystemInfoSync failed!');
                  }
                  var historyXDataList=[]
                  var historyScoreDataList=[]
                  wx.getStorage({
                    key:"historyXDataList",
                    success(res){
                      console.log(res.data)
                      historyXDataList=res.data
                      wx.getStorage({
                        key:"historyScoreDataList",
                        success(res){
                          console.log(res.data)
                          historyScoreDataList=res.data
                          console.log(historyXDataList)
                          console.log(historyScoreDataList)
                          yuelineChart = new wxCharts({ //当月用电折线图配置
                            canvasId: 'yueEle',
                            type: 'line', 
                            categories: historyXDataList, //categories X轴
                            animation: true, // 启用动画效果
                            animationDuration: 1000, // 设置动画持续时间为1000ms
                            animationTiming: 'easeInOut', // 设置动画缓动效果为easeInOut
                            series: [{
                              name: that.data.childrenList[index].name,
                              data: historyScoreDataList,
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
                            dataLabel: true,
                            dataPointShape: true,
                            extra: {
                              lineStyle: 'curve'
                            }
                          });
                        }
                      })
                    }
                  })
                }
              })
            }
          })
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
            data: res.data.data,
            success(res){
              var stateList=[]
              wx.getStorage({
                key: "stateList",
                success(res){
                  console.log(res.data)
                  stateList=res.data
                  var windowWidth = 320;
                  try {
                    var res = wx.getSystemInfoSync();
                    windowWidth = res.windowWidth;
                  } catch (e) {
                    console.error('getSystemInfoSync failed!');
                  }
                  var windowWidth = wx.getSystemInfoSync().windowWidth; // 获取屏幕宽度
                  var transformedData = stateList.map(function(item) {
                    return {
                      name: item.name,
                      data: item.value
                    };
                  });
                  // 使用wxCharts绘制饼状图
                  yuePieChart = new wxCharts({
                    canvasId: 'yuePie', // 在wxml中定义的canvas-id
                    type: 'pie', // 图表类型为饼状图
                    animation: true, // 启用动画效果
                    animationDuration: 1000, // 设置动画持续时间为1000ms
                    animationTiming: 'easeInOut', // 设置动画缓动效果为easeInOut
                    series:transformedData,
                    width: windowWidth, // 图表宽度，可以根据需求进行调整
                    height: 300, // 图表高度，可以根据需求进行调整
                    dataLabel: true, // 是否显示标签，默认为false
                    dataPointShape: true, // 是否显示数据点图形，默认为true
                    extra: {
                      lineStyle: 'curve' // 额外配置，这里设置曲线样式，可根据需求修改
                    }
                  });
                }
              })
              
            }
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
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    var that=this
    var historyXDataList=[]
    var historyScoreDataList=[]
    wx.getStorage({
      key:"historyXDataList",
      success(res){
        console.log(res.data)
        historyXDataList=res.data
        wx.getStorage({
          key:"historyScoreDataList",
          success(res){
            console.log(res.data)
            historyScoreDataList=res.data
            console.log(historyXDataList)
            console.log(historyScoreDataList)
            yuelineChart = new wxCharts({ //当月用电折线图配置
              canvasId: 'yueEle',
              type: 'line', 
              categories: historyXDataList, //categories X轴
              animation: true, // 启用动画效果
              animationDuration: 1000, // 设置动画持续时间为1000ms
              animationTiming: 'easeInOut', // 设置动画缓动效果为easeInOut
              series: [{
                name: that.data.childrenList[that.data.childrenIndex].name,
                data: historyScoreDataList,
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
              dataLabel: true,
              dataPointShape: true,
              extra: {
                lineStyle: 'curve'
              }
            });
          }
        })
      }
    })
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