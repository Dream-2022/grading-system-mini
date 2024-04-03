let API_HOST = "http://10.251.23.120:8084/examPaper/getMyEByC";
let DEBUG = false;//切换数据入口
var Mock = require("../../../utils/WxMock.js"); 
var Random = Mock.Random;
Random.natural()
function ajax(data = '', fn, method = "get", header = {},userInfo) {
    console.log(userInfo) 
    console.log(userInfo.shortToken) 
    if (!DEBUG) {
        wx.request({
          url: API_HOST,
          header:{
            "Authorization": userInfo.shortToken,
            'content-type': 'application/json' // 默认值
          },
          data:{
            "condition":"",
            "pageSize":5,
            "page":1
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

