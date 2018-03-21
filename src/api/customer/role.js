import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/customer/role/list',
    method: 'get',
    params: query
  })
}

export function createOne(data) {
  return request({
    url: '/v1/customer/role/addone',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: '/v1/customer/role/updateone',
    method: 'PATCH',
    data
  })
}

export function deleteOne(delete_id) {
  var url = '/v1/customer/role/deleteone'
  return request({
    url: url,
    method: 'delete',
    data: {
      id: delete_id
    }
  })
}

export function batchDelete(delete_ids) {
  var url = '/v1/customer/role/deletebatch'
  return request({
    url: url,
    method: 'delete',
    data: {
      ids: delete_ids
    }
  })
}
