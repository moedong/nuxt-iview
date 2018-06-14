import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import session from 'koa-session2'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import koaLogger from 'koa-logger'
import route from './routers'
import cors from '@koa/cors'

async function start() {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  // session必须在路由前注册
  app.use(
    session({
      key: '12345',
      overwrite: true
    })
  )
  // 配置控制台日志中间件
  app.use(koaLogger())
  app.use(cors())
  app.use(bodyParser())

  const router = new Router()
  router.use('', route.routes())
  app.use(router.routes()).use(router.allowedMethods())

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    ctx.req.session = ctx.session // 必须将session添加进request中，否则nuxt的req获取不到session
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
