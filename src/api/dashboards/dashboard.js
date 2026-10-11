import request from '@/utils/request'
// Fetch dashboard data (completed)
export function getDash() {
    return request({
      url: '/api/base/dashboard',
      method: 'get'
    })
  }