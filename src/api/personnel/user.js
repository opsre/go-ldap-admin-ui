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

// Change user status (completed)
export function changeUserStatus(data) {
  return request({
    url: '/api/user/changeUserStatus',
    method: 'post',
    data
  })
}

// Sync DingTalk user information
export function syncDingTalkUsersApi(data) {
  return request({
    url: '/api/user/syncDingTalkUsers',
    method: 'post',
    data
  })
}

// Sync WeCom user information
export function syncWeComUsersApi(data) {
  return request({
    url: '/api/user/syncWeComUsers',
    method: 'post',
    data
  })
}

// Sync Lark user information
export function syncFeiShuUsersApi(data) {
  return request({
    url: '/api/user/syncFeiShuUsers',
    method: 'post',
    data
  })
}

// Sync OpenLDAP user information
export function syncOpenLdapUsersApi(data) {
  return request({
    url: '/api/user/syncOpenLdapUsers',
    method: 'post',
    data
  })
}

// Sync users from SQL to LDAP
export function syncSqlUsers(data) {
  return request({
    url: '/api/user/syncSqlUsers',
    method: 'post',
    data
  })
}
