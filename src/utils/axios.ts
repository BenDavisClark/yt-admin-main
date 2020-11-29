import axios from 'axios'
import qs from 'qs'
import { error } from 'amiya'

const ajax: AnyKeyProps = axios.create({
  timeout: 120000 // 请求超时时间
})

const addToken = (config: AnyKeyProps) => {
  if (config.data && config.data.token === 'none') {
    return
  }
  const token: string = window.localStorage.getItem('TOKEN') || ''
  if (token) {
    config.headers.Authorization = token
  }
}

const transformPost = (config: AnyKeyProps) => {
  if (config.data) {
    if (config.data.transform) {
      delete config.data.transform
      config.transformRequest = [
        function(data: AnyKeyProps) {
          return qs.stringify(data)
        }
      ]
    }
    if (config.data.postFile) {
      delete config.data.postFile
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.transformRequest = [
        function(data: any) {
          return data.data
        }
      ]
    }
  }
  return config
}

const prefix = process.env.NODE_ENV === 'development' ? '/api' : '/api'

ajax.interceptors.request.use(
  (config: AnyKeyProps) => {
    config.url = prefix + config.url
    addToken(config)
    transformPost(config)
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

ajax.interceptors.response.use(
  (response: any) => {
    if (response.config.url.indexOf('workFlowDeploy/viewPic') > -1) {
      return response.data
    }
    if (response.status === 200 && response.data.success) {
      return response.data.obj
    } else if (
      response.data.errorType === 'notLogin' ||
      response.data.msg === '未登录' ||
      response.data.msg === '登录已过期，请重新登录！'
    ) {
      window.location.href = '/login'
    } else {
      error(response.data.msg)
      return Promise.reject(response?.data?.msg)
    }
  },
  (error: any) => {
    if (error.stack.indexOf('timeout') > -1) {
      // message: '接口请求超时',
    } else if (error.message !== undefined) {
      // message: '服务器请求错误',
    }
    return Promise.reject(error)
  }
)
export default ajax
