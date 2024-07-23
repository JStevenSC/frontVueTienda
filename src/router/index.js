import { createRouter, createWebHashHistory } from 'vue-router'
import ProductView from '../views/ProductsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ProductView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
