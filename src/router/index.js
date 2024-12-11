import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  () => import('@/App.vue')
    },
    {
      path: '/:id',
      name: 'detailClient',
      component:  () => import('@/Detail.vue')
    },
  ]
})

export default router
