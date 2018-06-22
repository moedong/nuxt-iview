import axios from 'axios'
import config from '../config'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios)
mock.onPost(config.base_url + '/api/v1.user/login').reply(function (config) {
  // console.log(JSON.parse(config.data).mobile)
  return [
    200,
    {'ret': 200, 'msg': '请求成功', 'data': {'code': 0, 'message': '登录成功', 'token': 'PhU0Sd9zwUSwOQgXnJpj7pgSwdA7YD80', 'id': 1, 'mobile': '13770267077', 'name': JSON.parse(config.data).mobile, 'sex': 1, 'status': 1, 'role_id': 1, 'depart_id': 1, 'leader_id': 0}}
  ]
})

export const userinfo = async (ctx, next) => {
  let token = ctx.session.user.token || ''
  return (ctx.body = {
    ret: 200,
    msg: '获取成功',
    data: { token: token }
  })
}

export const login = async (ctx, next) => {
  const { mobile, psd } = ctx.request.body
  if (!mobile || !psd) {
    return (ctx.body = {
      ret: 303,
      msg: '缺少请求参数',
      data: {}
    })
  }

  // 发起请求
  let _url = config.base_url + '/api/v1.user/login'
  let req = await axios.post(_url, {
    mobile: mobile,
    psd: psd,
    sign: ''
  })
  // 网络异常
  if (req.status !== 200) {
    return (ctx.body = {
      ret: 400,
      msg: '网络通讯异常',
      data: {}
    })
  }
  // 系统异常
  if (req.data.ret !== 200) {
    let ret = req.data.ret || 400
    let msg = req.data.msg || '失败'
    return (ctx.body = {
      ret: ret,
      msg: msg,
      data: {}
    })
  }

  // 登陆失败
  if (req.data.data.code !== 0) {
    let code = req.data.data.code || -1
    let message = req.data.data.message || '登录失败'
    return (ctx.body = {
      ret: 200,
      msg: '请求成功',
      data: {
        code: code,
        message: message
      }
    })
  }

  // 登陆成功
  let token = req.data.data.token
  let signkey = config.sign_key

  let info = {
    id: req.data.data.id,
    mobile: req.data.data.mobile,
    name: req.data.data.name,
    sex: req.data.data.sex,
    status: req.data.data.status,
    role_id: req.data.data.role_id,
    depart_id: req.data.data.depart_id,
    deader_id: req.data.data.deader_id
  }

  let session = ctx.session
  session.user = {
    token: token,
    sign_key: signkey,
    info: info
  }
  ctx.session = session

  return (ctx.body = {
    ret: 200,
    msg: '请求成功',
    data: {
      code: 0,
      message: '登录成功',
      token: token,
      info: info
    }
  })
}

export const logout = async (ctx, next) => {
  try {
    ctx.session.user = null
    return (ctx.body = {
      ret: 200,
      msg: '请求成功',
      data: {
        code: 0,
        message: '退出成功'
      }
    })
  } catch (e) {
    return (ctx.body = {
      ret: 200,
      msg: '请求成功',
      data: {
        code: -1,
        message: '退出失败'
      }
    })
  }
}
