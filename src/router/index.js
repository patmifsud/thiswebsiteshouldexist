import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Site from '../views/Site.vue'




Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/site/:siteId',
    name: 'Site',
    component: Site
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
