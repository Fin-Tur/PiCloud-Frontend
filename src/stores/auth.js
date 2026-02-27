import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)

  const initialized = ref(false)

  const isAuthenticated = computed(() => user.value !== null)

  function setUser(userData) {
    user.value = userData
  }

  function clearUser() {
    user.value = null
  }

  function markInitialized() {
    initialized.value = true
  }

  return { user, initialized, isAuthenticated, setUser, clearUser, markInitialized }
})
