import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import { mavonEditor } from "mavon-editor"
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/flexible.js'

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


Vue.component("mavon-editor", mavonEditor)
Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
