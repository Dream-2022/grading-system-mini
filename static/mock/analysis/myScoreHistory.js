let API_HOST = "http://192.168.9.105:9081/examAnalysis/my-score-history/2";
let DEBUG = false;//切换数据入口
var Mock = require("../../../utils/WxMock.js"); 
var Random = Mock.Random;
Random.natural()
function ajax(data = '', fn, method = "get", header = {}) {
    if (!DEBUG) {
        console.log("发送api请求")
        wx.request({
          url: API_HOST,
          header:{
            'content-type': 'application/json' // 默认值
          },
          method: 'GET',
          success (res) {
            console.log(res.data.data)
            fn(res);
          }
        }) 
    } else {
        // 模拟数据
        var res = Mock.mock({
            'success': '',
            'data': [{
              'excellent_num': '@natural(10, 100)',
              'good_num': '@natural(10, 100)',
              'pass_num': '@natural(10, 100)',
              'no_pass_num': '@natural(10, 100)'
            }]
        })
        fn(res);
    } 
}
module.exports = {
    ajax: ajax
}

