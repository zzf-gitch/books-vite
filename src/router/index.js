import { createRouter, createWebHistory , createWebHashHistory } from 'vue-router'
const Code = () => import('../views/Code.vue')
const routes = [
  {
    path: '/',
    name: 'Code',
    component: Code
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
