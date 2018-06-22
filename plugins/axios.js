/**
 * 用于koa服务器内部请求
 */

import Axios from 'axios'
import md5 from '~/libs/md5'
import { Message } from 'iview'

// 环境变量
const env = process.env.NODE_ENV || 'development'

let baseUrl = {
  development: 'https://dev.domain.com',
  test: 'https://test.domain.com',
  production: 'https://pro.domain.com'
}

// axios 配置
let options = {
  baseURL: baseUrl[env],
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

/**
 * 签名加密
 * @param  {Object} params 加密参数
 * @return string        加密结果
 */
const doSign = (data, signkey) => {
  let keys = Object.keys(data)
  // 这里写所需要的规则
  keys = keys.sort()
  let signstr = ''
  for (let i = 0; i < keys.length; i++) {
    signstr += keys[i] + '=' + data[keys[i]]
  }
  return md5(signstr + signkey)
}

/**
 * 获取url中的参数
 * @param  {String} url url地址
 * @return {Object}
 */
const getUrlParam = url => {
  if (typeof url === 'undefined') return false
  let params = {}
  let name, value
  let pos = url.indexOf('?')
  // 取得所有参数   stringvar.substr(start [, length ]
  url = url.substr(pos + 1)
  // 各个参数放到数组里
  let arr = url.split('&')
  for (let i = 0; i < arr.length; i++) {
    pos = arr[i].indexOf('=')
    if (pos > 0) {
      name = arr[i].substring(0, pos)
      value = arr[i].substr(pos + 1)
      params[name] = value
    }
  }
  let keys = Object.keys(params)
  return keys.length > 0 ? params : false
}

// 请求拦截器
axios.interceptors.request.use(
  req => {
    // 在发送请求之前 做参数加密工作，当参数存在sign_key且不为空,则开启加密
    // get方式处理
    if (
      req.method === 'get' &&
      typeof req.params !== 'undefined' &&
      typeof req.params.sign_key !== 'undefined' &&
      req.params.sign_key !== ''
    ) {
      let data = req.params
      let urlparams = getUrlParam(req.url)
      if (urlparams !== false) {
        data = Object.assign(data, urlparams)
        let pos = req.url.indexOf('?')
        let url = req.url.substr(0, pos)
        req.url = url
      }
      let signkey = data.sign_key
      delete data.sign_key
      let sign = doSign(data, signkey)
      data.sign = sign
      req.params = data
    }
    // post方式处理
    if (
      req.method === 'post' &&
      typeof req.data !== 'undefined' &&
      typeof req.data.sign_key !== 'undefined' &&
      req.data.sign_key !== ''
    ) {
      let data = req.data
      let urlparams = getUrlParam(req.url)
      if (urlparams !== false) {
        data = Object.assign(data, urlparams)
      }
      let signkey = data.sign_key
      delete data.sign_key
      let sign = doSign(data, signkey)
      data.sign = sign
      req.data = data
    }
    // console.log('request.use', req)
    return req
  },
  err => {
    console.log('axios.interceptors.request.', err)
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  res => {
    if (res.status && res.status === 200 && res.data.status === 'error') {
      return
    }
    return res
  },
  err => {
    try {
      // console.log('axios.interceptors.response.', err)
      if (err.response.status !== 200) {
        if (process.client) {
          Message.error(err.response.data.msg || '')
        }
      }
      /* if (process.client) {
          console.log('error by client')
        } else {
          console.log('error by server')
        } */
      return Promise.resolve(err.response)
    } catch (e) {
      if (process.client) {
        Message.error('系统性错误')
        console.info(e)
      }
    }
  }
)

export default axios
