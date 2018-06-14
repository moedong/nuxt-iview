/**
 * 用于请求本koa2服务
 */
import Axios from 'axios'
import { Message } from 'iview'

let baseUrl = `http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT ||
  3000}`

let options = {
  baseURL: baseUrl,
  timeout: 5000,
  responseType: 'json',
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
}
// 创建实例
let axios = Axios.create(options)

// 拦截
axios.interceptors.response.use(
  res => {
    if (res.status && res.status === 200 && res.data.status === 'error') {
      return
    }
    return res
  },
  err => {
    if (err.response.status !== 200) {
      if (process.client) {
        Message.error(err.response.data.msg || '')
      }
    }
    return Promise.resolve(err.response)
  }
)
export default axios
