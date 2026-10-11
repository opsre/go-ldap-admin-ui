import request from '@/utils/request'

// Fetch the group tree (completed)
export function getGroupTree(params) {
  return request({
    url: '/api/group/tree',
    method: 'get',
    params
  })
}
// List groups (completed)
export function groupList(params) {
  return request({
    url: '/api/group/list',
    method: 'get',
    params
  })
}
// Add a group (completed)
export function groupAdd(data) {
  return request({
    url: '/api/group/add',
    method: 'post',
    data
  })
}
// Update a group (completed)
export function groupUpdate(data) {
  return request({
    url: '/api/group/update',
    method: 'post',
    data
  })
}
// Delete a group (completed)
export function groupDel(data) {
  return request({
    url: '/api/group/delete',
    method: 'post',
    data
  })
}
// List users in the group (completed)
export function useGroupList(params) {
  return request({
    url: '/api/group/useringroup',
    method: 'get',
    params
  })
}
// List users no longer in the group (completed)
export function useGroupRole(params) {
  return request({
    url: '/api/group/usernoingroup',
    method: 'get',
    params
  })
}
// Add a user to a group (completed)
export function groupInfo(data) {
  return request({
    url: '/api/group/adduser',
    method: 'post',
    data
  })
}
// Remove a user from a group (completed)
export function delGroup(data) {
  return request({
    url: '/api/group/removeuser',
    method: 'post',
    data
  })
}
// Sync DingTalk department information
export function syncDingTalkDeptsApi(data) {
  return request({
    url: '/api/group/syncDingTalkDepts',
    method: 'post',
    data
  })
}

// Sync WeCom department information
export function syncWeComDeptsApi(data) {
  return request({
    url: '/api/group/syncWeComDepts',
    method: 'post',
    data
  })
}

// Sync Lark department information
export function syncFeiShuDeptsApi(data) {
  return request({
    url: '/api/group/syncFeiShuDepts',
    method: 'post',
    data
  })
}

// Sync OpenLDAP department information
export function syncOpenLdapDeptsApi(data) {
  return request({
    url: '/api/group/syncOpenLdapDepts',
    method: 'post',
    data
  })
}
// Sync database groups to LDAP
export function syncSqlGroups(data) {
  return request({
    url: '/api/group/syncSqlGroups',
    method: 'post',
    data
  })
}