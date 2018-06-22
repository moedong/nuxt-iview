const user = {
  state: {
    token: null, // 登陆token
    sign_key: null, // 加密密钥
    info: {} // 用户的信息
  },
  getters: {
    getToken: state => {
      return state.token
    },
    getSignKey: state => {
      return state.sign_key
    },
    token: state => {
      return state.token
    },
    signkey: state => {
      return state.sign_key
    },
    getUserId: state => {
      return state.info.id || null
    },
    getInfo: state => {
      return state.info
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, info = {}) => {
      state.info = info
    },
    // 登陆
    LOGIN: (state, session) => {
      state.token = session.user.token || null
      state.sign_key = session.user.sign_key || null
      state.info = session.user.info || {}
    },
    // 登出
    LOGOUT: state => {
      state.token = null
      state.sign_key = null
      state.info = {}
    }
  },
  actions: {
    // 登出
    LOGOUT: state => {
      state.token = null
      state.sign_key = null
      state.info = {}
    }
  }
}

export default user
