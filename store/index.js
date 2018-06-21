import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = () =>
  new Vuex.Store({
    state: {
      name: ''
    },
    getters: {
    },
    mutations: {},
    actions: {
      nuxtServerInit: async ({ commit }, { req, res }) => {
        // console.log('nuxtServerInit', res.session)
        if (!!req.session && !!req.session.user && !!req.session.user.token) {
          commit('LOGIN', req.session)
        } else {
          commit('LOGOUT')
        }
      }
    },
    modules: {
      app,
      user
    }
  })

export default store
