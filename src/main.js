import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import mavonEditor from "mavon-editor"
import 'mavon-editor/dist/css/index.css';
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/flexible.js'
import axios from 'axios';
import vuescroll from "vuescroll"
import "vuescroll/dist/vuescroll.css"
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import katex from "@iktakahiro/markdown-it-katex"
import GLOBAL from './Global.vue'
Vue.prototype.axios = axios;
// axios.defaults.baseURL = ''
axios.defaults.withCredentials = true
Vue.prototype.global = GLOBAL; 

// 以下是组件的声明
import Carousel from './components/Carousel'
Vue.component("Carousel", Carousel);
import BackTop from './components/BackTop'
Vue.component("BackTop", BackTop);
import TopBar from './components/TopBar'
Vue.component("TopBar", TopBar);
import LatestNotes from './components/LatestNotes'
Vue.component("LatestNotes", LatestNotes);
import NotesCard from './components/NotesCard'
Vue.component("NotesCard", NotesCard);
import Star from './components/star'
Vue.component("Star", Star)
import CategoryCard from './components/CategoryCard'
import VueRouter from 'vue-router'
Vue.component("CategoryCard", CategoryCard)


Vue.component("mavon-editor", mavonEditor)
Vue.use(Element)
Vue.use(vuescroll)
Vue.use(mavonEditor);
Vue.use(MarkdownItVue);
mavonEditor.markdownIt.use(katex);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (sessionStorage.getItem("Authorization") === null) {
      next('/MainPage');
    } else {
      next();
    }
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(VueRouter)

// 解决两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
