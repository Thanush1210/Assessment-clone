import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/display',
      name: 'display',
      component: () => import("../views/DisplayView.vue"),
    }
  ]
})

export default router
