let API_HOST = "http://192.168.50.24:8084/examPaper/getMyEByC";
let DEBUG = true;//切换数据入口
var Mock = require("../../../utils/WxMock.js"); 
var Random = Mock.Random;
Random.natural()
function ajax(data = '', fn, method = "get", header = {}) {
    if (!DEBUG) {
        // wx.request({
        //     url: API_HOST,
        //     method: method ? method : 'get',
        //     data: {
        //       condition:''
        //     },
        //     header: { 
        //       "Content-Type": "application/json" ,
        //       "Authorization": userInfo.shortToken
        //     },
        //     success: function (res) {
        //         fn(res);
        //     }
        // });
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
            'data|3-10': [{
              'id': '@natural(1, 100)',
              'title': '@ctitle(3, 5)',
              'score': '@natural(0, 100)',
              'scored|1': [100,120,150],
              'date': function() {
                  return Mock.mock('@datetime(yyyy-MM-dd HH:mm, "now")');
              },
              'comment': '@cparagraph(2,5)',
              'state': '@boolean()'
            }]
        })
        fn(res);
    } 
}
module.exports = {
    ajax: ajax
}

