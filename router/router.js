// router.js
import index from '~/pages/index'
import other from '~/components/other'
import message from '~/components/message/message.vue'
import imageeditor from '~/components/my-components/image-editor/image-editor.vue'
import draggablelist from '~/components/my-components/draggable-list/draggable-list.vue'
import home from '~/components/home/home.vue'
//import articlepublish from '~/components/form/article-publish/article-publish.vue'
import workflow from '~/components/form/work-flow/work-flow.vue'
import dragabletable from '~/components/tables/dragable-table.vue'
import editabletable from '~/components/tables/editable-table.vue'
import errorpage from '~/components/error-page/error-page.vue'

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'home',
    component: index,
    redirect: '/home',
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: home },
        { path: 'message', title: '消息中心', name: 'message_index', component: message }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'android-checkbox',
        name: 'usermanager',
        title: '组件',
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
        icon: 'android-checkbox',
        name: 'form',
        title: '表单编辑',
        component: index,
        children: [
            //{ path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component:articlepublish},
            { path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component:workflow}

        ]
    },
    {
        path: '/',
        icon: 'ios-grid-view',
        name: 'tables',
        title: '表格',
        component: index,
        children: [
            { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component:dragabletable},
            { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component:editabletable},
        ]
    },
    {
        path: '/',
        icon: 'android-sad',
        title: '错误页面',
        name: 'errorpage',
        component: index,
        children: [
            { path: 'index', title: '错误页面', name: 'errorpage_index', component:errorpage}
        ]
    }
]