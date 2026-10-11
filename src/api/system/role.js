import request from '@/utils/request'

// Fetch the role list (completed)
export function getRoles(params) {
  return request({
    url: '/api/role/list',
    method: 'get',
    params
  })
}

// Create a role (completed)
export function createRole(data) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data
  })
}

// Update a role (completed)
export function updateRoleById(data) {
  return request({
    url: '/api/role/update',
    method: 'post',
    data
  })
}

// Fetch role permission menus (completed)
export function getRoleMenusById(params) {
  return request({
    url: '/api/role/getmenulist',
    method: 'get',
    params
  })
}

// Update role permission menus (completed)
export function updateRoleMenusById( data) {
  return request({
    url: '/api/role/updatemenus',
    method: 'post',
    data
  })
}

// Fetch role permission APIs (completed)
export function getRoleApisById(params) {
  return request({
    url: '/api/role/getapilist',
    method: 'get',
    params
  })
}

// Update role permission APIs (completed)
export function updateRoleApisById(data) {
  return request({
    url: '/api/role/updateapis',
    method: 'post',
    data
  })
}

// Delete roles in batches (completed)
export function batchDeleteRoleByIds(data) {
  return request({
    url: '/api/role/delete',
    method: 'post',
    data
  })
}
