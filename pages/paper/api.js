
// import request from '@/utils/request'

export function getMyAllE(data) {
  return request({
    url: '/examPaper/getMyAllE',
    method: 'get',
    data
  })
}
