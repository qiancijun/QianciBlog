import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

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
    redirect: '/MainPage'
  },
  {
    path: '/MainPage',
    name: 'MainPage',
    component: () => import('@/views/MainPage.vue')
  },
  {
    path: '/NotesRound',
    name: 'NotesRound',
    component: () => import('@/views/NotesRound.vue')
  },
  {
    path: '/About',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
