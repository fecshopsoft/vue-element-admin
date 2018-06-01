import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/customer/uuid/list',
    method: 'get',
    params: query
  })
}

export function fetchTrendInfo(query) {
  return request({
    url: '/v1/customer/uuid/fetchtrendinfo',
    method: 'get',
    async: false,
    params: query
  })
}

export function fetchOne(query) {
  return request({
    url: '/v1/customer/uuid/one',
    method: 'get',
    async: true,
    params: query
  })
}
