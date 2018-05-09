// router.js
import index from '~/pages/index'
import other from '~/components/other'
import message from '~/components/message/message.vue'
import imageeditor from '~/components/my-components/image-editor/image-editor.vue'
import draggablelist from '~/components/my-components/draggable-list/draggable-list.vue'

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    component: index,
    children: [
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/components/message/message.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'android-checkbox',
        name: 'usermanager',
        title: '用户管理',
        component: index,
        children: [
            {
                path: 'image-editor',
                icon: 'crop',
                name: 'image-editor',
                title: '图片预览编辑',
                component: imageeditor
            },
            {
                path: 'draggable-list',
                icon: 'arrow-move',
                name: 'draggable-list',
                title: '可拖拽列表',
                component:draggablelist
            }
        ]
    },
    {
        path: '/',
        icon: 'social-buffer',
        name: 'article',
        title: '其他',
        component: index,
        children: [
            { path: 'other', title: '文章发布', name: 'other', icon: 'compose', component: other }
        ]
    }
]