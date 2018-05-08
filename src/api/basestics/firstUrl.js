import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/whole/firsturl/list',
    method: 'get',
    params: query
  })
}

export function fetchTrendInfo(query) {
  return request({
    url: '/v1/whole/firsturl/fetchtrendinfo',
    method: 'get',
    async: false,
    params: query
  })
}
