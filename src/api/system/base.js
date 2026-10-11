import request from '@/utils/request'
// User login (completed)
export function login(data) {
  return request({
    url: '/api/base/login',
    method: 'post',
    data
  })
}

export function refreshToken() {
  return request({
    url: '/api/base/refreshToken',
    method: 'post'
  })
}
// User logout endpoint (completed)
export function logout() {
  return request({
    url: '/api/base/logout',
    method: 'post'
  })
}
// Fetch configuration information
export function getConfig() {
  return request({
    url: '/api/base/config',
    method: 'get'
  })
}
// Fetch version information
export function getVersion() {
  return request({
    url: '/api/base/version',
    method: 'get'
  })
}
