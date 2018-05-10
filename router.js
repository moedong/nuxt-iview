// router.js
import Vue from 'vue'
import Router from 'vue-router'

import {otherRouter,appRouter} from '~/router/router.js'

Vue.use(Router)

const routers = [
    otherRouter,
    ...appRouter
];

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    routes:routers,
    fallback: false
  })
}