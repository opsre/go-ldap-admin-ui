import request from '@/utils/request'

// Fetch the menu tree (completed)
export function getMenuTree() {
  return request({
    url: '/api/menu/tree',
    method: 'get'
  })
}

// Fetch the menu list
export function getMenus() {
  return request({
    url: '/api/menu/list',
    method: 'get'
  })
}

// Create a menu (completed)
export function createMenu(data) {
  return request({
    url: '/api/menu/add',
    method: 'post',
    data
  })
}

// Update a menu (completed)
export function updateMenuById(data) {
  return request({
    url: '/api/menu/update',
    method: 'post',
    data
  })
}

// Delete menus in batches (completed)
export function batchDeleteMenuByIds(data) {
  return request({
    url: '/api/menu/delete',
    method: 'post',
    data
  })
}

// Fetch the list of menus accessible to the user
export function getUserMenusByUserId(Id) {
  return request({
    url: '/api/menu/access/list/' + Id,
    method: 'get'
  })
}

// Fetch the menu tree accessible to the user
export function getUserMenuTreeByUserId(params) {
  return request({
    url: '/api/menu/access/tree',
    method: 'get',
    params
  })
}
