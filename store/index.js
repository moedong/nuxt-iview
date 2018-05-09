import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from 'vuex-persist'

import app from './modules/app';
import user from './modules/user';


Vue.use(Vuex)

const store = () => new Vuex.Store({
  
  state: {
    columns1: [
      {
        title: '标题',
        key: 'title'
      },
      {
        title: '介绍',
        key: 'intro'
      },
      {
        title: '日期',
        key: 'time'
      }
    ],
    data1: [],
    user: 'xu' //如果为空，则会中间件控制跳转404
  },
  mutations: {
    SET_LIST: (state, data) => {
      state.data1 = data
    },
  },
  modules: {
        app,
        user
    }
})

export default store
