import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/v1/customer/account/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/v1/customer/account/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/v1/customer/account/index',
    method: 'get',
    params: { token }
  })
}

