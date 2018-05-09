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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  css: [
    { src: '~assets/css/main.less', lang: 'less' },
    { src: 'iview/dist/styles/iview.css'}
  ],
  plugins: [
    { src: '~plugins/flexible.js', ssr: false },
    { src: '~plugins/iview.js', ssr: false }
  ],
  loading: './components/loading.vue',
  cache: true,
  build: {
    vendor: ['axios']
  },
  generate: {
    routes: [
      '/'
    ]
  },
  modules: [
    '@nuxtjs/router'
 ]
}
