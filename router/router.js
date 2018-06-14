// router.js
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  children: [
    {
      path: 'home',
      title: { i18n: 'home' },
      name: 'home_index'
    },
    {
      path: 'message',
      title: '消息中心',
      name: 'message_index'
    }
  ]
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/',
    icon: 'ios-home',
    name: 'index-base',
    title: '主页',
    children: [
      {
        path: '/index',
        title: '主页',
        name: 'index',
        icon: 'ios-home'
      }
    ]
  },
  {
    path: '/form',
    icon: 'android-checkbox',
    name: 'form',
    title: '表单编辑',
    children: [
      {
        path: '/form/work-flow',
        title: '工作流',
        name: 'form-work-flow',
        icon: 'arrow-swap'
      },
      {
        path: '/form/article-publish',
        title: '发布文章',
        name: 'form-article-publish',
        icon: 'ios-home'
      }
    ]
  },
  {
    path: '/error-page',
    icon: 'android-sad',
    title: '错误页面',
    name: 'errorpage',
    children: [
      {
        path: '/error-page/error-page',
        title: '错误页面',
        name: 'error-page-error-page'
      }
    ]
  }
]
