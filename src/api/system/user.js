import request from '@/utils/request'

// Fetch the current logged-in user information (completed)
export function getInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

// Fetch the user list (completed)
export function getUsers(params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params
  })
}

// Update the user login password (completed)
export function changePwd(data) {
  return request({
    url: '/api/user/changePwd',
    method: 'post',
    data
  })
}
// Enter an email address to get a verification code
export function sendCode(data) {
  return request({
    url: '/api/base/sendcode',
    method: 'post',
    data
  })
}
// Update a user password by email (completed)
export function emailPass(data) {
  return request({
    url: '/api/base/changePwd',
    method: 'post',
    data
  })
}
// Create a user (completed)
export function createUser(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

// Update a user (completed)
export function updateUserById(data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}
// Delete records in batches* (completed)
export function batchDeleteUserByIds(data) {
  return request({
    url: '/api/user/delete',
    method: 'post',
    data
  })
}

// Reset a user password (completed)
export function resetPassword(data) {
  return request({
    url: '/api/user/resetPassword',
    method: 'post',
    data
  })
}

