import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
// import router from '@/router'
import { getToken } from '@/utils/auth'
import router from '@/router'
import i18n, { getLocale } from '@/lang'
import { buildAcceptLanguage } from '@/utils/i18n'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/' // api 的 base_url
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const locale = getLocale()
    config.headers['X-Locale'] = locale
    config.headers['Accept-Language'] = buildAcceptLanguage(locale)
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
      // config.headers['Content-Type'] = 'application/json'
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code === 0 || res.code === 200) {
      return res
    } else {
      Message({
        message: res.msg || res.message || i18n.t('common.unknownError'),
        type: 'error'
      })
      return false
    }
  },
  error => {
    const response = error.response || {}
    const data = response.data || {}
    const message = data.msg || data.message || error.message || i18n.t('common.unknownError')

    if (!response.status) {
      Message({
        showClose: true,
        message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }

    if (response.status === 401) {
      if (store.getters.token) {
        MessageBox.confirm(
          i18n.t('login.invalid'),
          i18n.t('login.expired'),
          {
            confirmButtonText: i18n.t('common.relogin'),
            cancelButtonText: i18n.t('common.stay'),
            type: 'warning'
          }
        ).then(() => {
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          store.dispatch('user/logout').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          showClose: true,
          message,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    } else if (response.status === 403) {
      router.push({ path: '/401' })
    } else {
      Message({
        showClose: true,
        message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
