import request from '@/utils/request'

// List dynamic field relations (completed)
export function relationList(params) {
  return request({
    url: '/api/fieldrelation/list',
    method: 'get',
    params
  })
}
// Add a dynamic field relation (completed)
export function relationAdd(data) {
  return request({
    url: '/api/fieldrelation/add',
    method: 'post',
    data
  })
}
// Update a dynamic field relation (completed)
export function relationUp(data) {
  return request({
    url: '/api/fieldrelation/update',
    method: 'post',
    data
  })
}
// Delete a dynamic field relation (completed)
export function relationDel(data) {
  return request({
    url: '/api/fieldrelation/delete',
    method: 'post',
    data
  })
}

