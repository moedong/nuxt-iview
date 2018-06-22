module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-temp',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', name: 'iview', href: '/styles/iview.css' },
      { rel: 'stylesheet', name: 'theme', href: '' }
    ]
  },
  css: [
    { src: '~assets/css/main.css' }
    // { src: 'iview/dist/styles/iview.css' }
  ],
  plugins: [
    { src: '~plugins/flexible.js', ssr: false },
    { src: '~plugins/iview.js', ssr: true }
  ],
  loading: './components/loading.vue',
  env: {
    NODE_ENV: process.env.NODE_ENV
  },
  cache: {
    max: 1000,
    maxAge: 900000
  },
  router: {
    middleware: 'route' // 在每页渲染前运行 middleware/route.js 中间件的逻辑
  },
  build: {
    vendor: ['axios', 'iview', './plugins/iview.js'],
    extend(config, ctx) {
      if (ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
