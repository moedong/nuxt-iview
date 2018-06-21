import test from 'ava'
import createNuxt from './helpers/create-nuxt'

let nuxt = null
const headers = {
  'accept-language': 'zh'
}
// Init nuxt.js and create server listening on localhost:4000
test.before('Init Nuxt.js', async t => {
  nuxt = createNuxt()
  await nuxt.listen(3000, '127.0.0.1')
})

// 初始化 Nuxt.js 并创建一个监听 localhost:4000 的服务器
// test.before('Init Nuxt.js', async t => {
//   const rootDir = resolve(__dirname, '..')
//   let config = {}
//   try { config = require(resolve(rootDir, 'nuxt.config.js')) } catch (e) {}
//   config.rootDir = rootDir // 项目目录
//   config.dev = false // 生产构建模式
//   nuxt = new Nuxt(config)
//   await new Builder(nuxt).build()
//   nuxt.listen(4000, 'localhost')
// })

test('Vendor', async t => {
  const vendor = nuxt.options.build.vendor
  t.true(!!~vendor.indexOf('axios'), 'axios added to config')
})

test('Plugin', async t => {
  const plugins = nuxt.options.plugins
  t.is(
    plugins[0].src,
    '~plugins/flexible.js',
    'flexible plugin added to config'
  )
  t.is(plugins[1].src, '~plugins/iview.js', 'iview plugin added to config')
})

// 测试生成的html
test('路由 / 有效且能渲染 HTML', async t => {
  const { html } = await nuxt.renderRoute('/', {
    req: { session: {}, headers }
  })
  t.true(html.includes('<div id="__nuxt"></div>'))
})

// 关掉服务器和Nuxt实例，停止文件监听。
test.after('Closing server and nuxt.js', async t => {
  await nuxt.close()
})
