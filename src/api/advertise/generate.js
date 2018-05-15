import request from '@/utils/request'

export function fetchInit(query) {
  return request({
    url: '/v1/whole/advertise/init',
    method: 'get',
    params: query
  })
}

export function generateAdvertieseUrl(query) {
  return request({
    url: '/v1/whole/advertise/generateurl',
    method: 'get',
    params: query
  })
}

export function generateMutilAdvertise(excelFile) {
  return request({
    url: '/v1/whole/advertise/generatemutiladvertise',
    method: 'post',
    responseType: 'blob',
    headers: { 'Content-Type': 'multipart/form-data' },
    excelFile
  })
}
