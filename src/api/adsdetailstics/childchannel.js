import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/advertise/medium/list',
    method: 'get',
    params: query
  })
}

export function fetchTrendInfo(query) {
  return request({
    url: '/v1/advertise/medium/fetchtrendinfo',
    method: 'get',
    async: false,
    params: query
  })
}
