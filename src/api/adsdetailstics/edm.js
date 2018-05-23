import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/advertise/edm/list',
    method: 'get',
    params: query
  })
}

export function fetchTrendInfo(query) {
  return request({
    url: '/v1/advertise/edm/fetchtrendinfo',
    method: 'get',
    async: false,
    params: query
  })
}
