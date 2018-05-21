import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/advertise/design/list',
    method: 'get',
    params: query
  })
}

export function fetchTrendInfo(query) {
  return request({
    url: '/v1/advertise/design/fetchtrendinfo',
    method: 'get',
    async: false,
    params: query
  })
}
