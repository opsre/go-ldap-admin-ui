import request from '@/utils/request'

// Fetch the API list (completed)
export function getApis(params) {
  return request({
    url: '/api/api/list',
    method: 'get',
    params
  })
}

// Fetch the API tree, grouped by the API Category field (completed)
export function getApiTree(params) {
  return request({
    url: '/api/api/tree',
    method: 'get',
    params
  })
}

// Create an API (completed)
export function createApi(data) {
  return request({
    url: '/api/api/add',
    method: 'post',
    data
  })
}

// Update an API (completed)
export function updateApiById(data) {
  return request({
    url: '/api/api/update',
    method: 'post',
    data
  })
}

// Delete APIs in batches (completed)
export function batchDeleteApiByIds(data) {
  return request({
    url: '/api/api/delete',
    method: 'post',
    data
  })
}
