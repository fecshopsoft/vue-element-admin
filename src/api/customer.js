import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/v1/customer/list',
    method: 'get',
    params: query
  })
}
/*
export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}
*/

export function createOne(data) {
  return request({
    url: '/v1/customer/addone',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: '/v1/customer/updateone',
    method: 'PATCH',
    data
  })
}

export function deleteOne(delete_id) {
  var url = '/v1/customers/id/' + delete_id
  return request({
    url: url,
    method: 'delete'
  })
}

export function batchDelete(delete_ids) {
  var url = '/v1/customer/batch'
  return request({
    url: url,
    method: 'delete',
    data: {
      ids: delete_ids
    }
  })
}

export function updatePassword(data) {
  return request({
    url: '/v1/customer/updatepassword',
    method: 'PATCH',
    data
  })
}
