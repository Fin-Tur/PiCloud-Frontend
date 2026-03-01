import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import CloudView from '../views/CloudView.vue'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/cloud',
      name: 'cloud',
      component: CloudView,
      meta: { requiresAuth: true },
    },
  ],
})

  //DEV ONLY

/*router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (!authStore.initialized) {
    const { fetchCurrentUser } = await import('@/services/api.js')
    await fetchCurrentUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'login' }
  }
  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'cloud' }
  }
})*/

export default router
