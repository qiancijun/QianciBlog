import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// resolve=>(require(['需要加载的路由的地址'])，resolve)
const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path: '/',
    redirect: '/MainPage',
    meta: {isAdmin: false},
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    meta: {isAdmin: false},
    component: () => import('@/views/MainPage.vue')
    // component: resolve => (require(['@/views/MainPage.vue']), resolve)
  },
  {
    path: '/NotesRound',
    name: 'NotesRound',
    meta: {isAdmin: false},
    component: () => import('@/views/NotesRound.vue')
    // component: resolve => (require(['@/views/NotesRound.vue']), resolve)
  },
  {
    path: '/About',
    name: 'About',
    meta: {isAdmin: false},
    component: () => import('@/views/About.vue')
  },
  {
    path: '/BlogPage',
    name: 'BlogPage',
    component: () => import('@/views/BlogPage.vue'),
    meta: {isAdmin: true},
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {isAdmin: true},
  },
  {
    path: '/Admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {isAdmin: true, requireAuth: true},
    children: [
      {
        path: '/Admin/CategoryManage',
        name: 'CategoryManage',
        component: () => import('@/views/AdminPage/CategoryManage.vue'),
        meta: {isAdmin: true, requireAuth: true},
      },
      {
        path: '/Admin/TagManage',
        name: 'TagManage',
        component: () => import('@/views/AdminPage/TagManage.vue'),
        meta: {isAdmin: true, requireAuth: true},
      },
      {
        path: '/Admin/MarkdownManage',
        name: 'MarkdownManage',
        component: () => import('@/views/AdminPage/MarkdownManage.vue'),
        meta: {isAdmin: true, requireAuth: true},
      },
      {
        path: '/Admin/NoteUpLoad',
        name: 'NoteUpLoad',
        component: () => import('@/views/AdminPage/NoteUpLoad.vue'),
        meta: {isAdmin: true},
      },
      {
        path: '/Admin/MarkdownModify',
        name: 'MarkdownModify',
        component: () => import('@/views/AdminPage/MarkdownModify.vue'),
        meta: {isAdmin: true, requireAuth: true},
      },
      {
        path: '/Admin/EditPage',
        name: 'EditPage',
        component: () => import('@/views/AdminPage/EditPage.vue'),
        meta: {isAdmin: true, requireAuth: true},
      }
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
