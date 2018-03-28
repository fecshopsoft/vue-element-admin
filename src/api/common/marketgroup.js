import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/common/marketgroup/list',
    method: 'get',
    params: query
  })
}

export function createOne(data) {
  return request({
    url: '/v1/common/marketgroup/addone',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: '/v1/common/marketgroup/updateone',
    method: 'PATCH',
    data
  })
}

export function deleteOne(delete_id) {
  var url = '/v1/common/marketgroup/deleteone'
  return request({
    url: url,
    method: 'delete',
    data: {
      id: delete_id
    }
  })
}

export function batchDelete(delete_ids) {
  var url = '/v1/common/marketgroup/deletebatch'
  return request({
    url: url,
    method: 'delete',
    data: {
      ids: delete_ids
    }
  })
}
