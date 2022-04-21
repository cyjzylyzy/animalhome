import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode:"history",
  routes: [
     {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },

                {
                    path: '/animal',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/animal.vue'),
                    meta: { title: '宠物管理' }
                },
                {
                    path: '/notice',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/notice.vue'),
                    meta: { title: '公告管理' }
                },
                {
                    path: '/userform',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/userform.vue'),
                    meta: { title: '用户信息管理' }
                },
                {

                    path: '/adoptanimal',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/adoptanimal.vue'),
                    meta: { title: '领养动物管理' }
                },
                {

                    path: '/seedanimal',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/seedanimal.vue'),
                    meta: { title: '送养管理' }
                },
                {
                    // 图片上传组件
                    path: '/seek_animal',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/seek_animal.vue'),
                    meta: { title: '用户寻宠管理' }
                },
                {
                    // vue-schart组件
                    path: '/question',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/question.vue'),
                    meta: { title: '题库管理' }
                },

                {
                    // 拖拽Dialog组件
                    path: '/support',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/support.vue'),
                    meta: { title: '云养管理' }
                },
              {
                    // 拖拽Dialog组件
                    path: '/transaction',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/transaction.vue'),
                    meta: { title: '收支管理' }
                },
                {

                    path: '/comment',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/comment.vue'),
                    meta: { title: '评论管理', permission: true }
                },

                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },

            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
  ]
})
