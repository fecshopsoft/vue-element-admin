import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/whole/browser/list',
    method: 'get',
    params: query
  })
}

export function fetchOne(data) {
  return request({
    url: '/v1/whole/browser/fetchone',
    method: 'get',
    data
  })
}
