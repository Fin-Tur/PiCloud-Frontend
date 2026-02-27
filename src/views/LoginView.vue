<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PiCloudIcon from '@/components/PiCloudIcon.vue'
import { login, register } from '@/services/api.js'

const router = useRouter()

const isLogin = ref(true)

const loginUsername = ref('')
const loginPassword = ref('')

const registerUsername = ref('')
const registerPassword = ref('')
const confirmPassword = ref('')

const message = ref('')
const messageType = ref('')

function switchToRegister() {
  isLogin.value = false
  message.value = ''
}

function switchToLogin() {
  isLogin.value = true
  message.value = ''
}

async function handleLogin() {
  try {
    const response = await login(loginUsername.value, loginPassword.value)
    if (response?.success) {
      router.push('/cloud')
    } else {
      message.value = response?.message || 'Invalid username or password.'
      messageType.value = 'error'
    }
  } catch (error) {
    message.value = error.message || 'An Error occured during Login.'
    messageType.value = 'error'
  }
}

async function handleRegister() {
  if (registerPassword.value !== confirmPassword.value) {
    message.value = 'Passwords  are not the same.'
    messageType.value = 'error'
    return
  }
  try {
    const response = await register(registerUsername.value, registerPassword.value)
    if (response?.success) {
      message.value = 'Regristration succesful. Please log in!.'
      messageType.value = 'success'
      switchToLogin()
      return
    }
    message.value = response?.message || 'Registration went wrong.'
    messageType.value = 'error'
  } catch (error) {
    message.value = error.message || 'An Error Occured during Registration.'
    messageType.value = 'error'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4">
    <div class="w-full max-w-md">
      <!-- Card -->
      <div class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8">
        <!-- Header -->
        <div class="flex flex-col items-center mb-8">
          <PiCloudIcon :size="72" class="mb-4 drop-shadow-lg" />
          <h1 class="text-3xl font-bold text-white tracking-tight">Pi Cloud</h1>
          <p class="text-indigo-300 text-sm mt-1">Secure Cloud Storage</p>
        </div>

        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-5">
          <h2 class="text-xl font-semibold text-white text-center">Login</h2>

          <div>
            <input
              v-model="loginUsername"
              type="text"
              placeholder="Username"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <input
              v-model="loginPassword"
              type="password"
              placeholder="Password"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/25"
          >
            Login
          </button>

          <p class="text-center text-sm text-indigo-300/70">
            Don't have an account?
            <a
              href="#"
              class="text-indigo-400 hover:text-indigo-300 font-medium transition"
              @click.prevent="switchToRegister"
            >
              Register here
            </a>
          </p>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-5">
          <h2 class="text-xl font-semibold text-white text-center">Register</h2>

          <div>
            <input
              v-model="registerUsername"
              type="text"
              placeholder="Username"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <input
              v-model="registerPassword"
              type="password"
              placeholder="Password (min 6 chars)"
              required
              minlength="6"
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              class="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            class="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold transition cursor-pointer shadow-lg shadow-indigo-500/25"
          >
            Register
          </button>

          <p class="text-center text-sm text-indigo-300/70">
            Already have an account?
            <a
              href="#"
              class="text-indigo-400 hover:text-indigo-300 font-medium transition"
              @click.prevent="switchToLogin"
            >
              Login here
            </a>
          </p>
        </form>

        <!-- Message Display -->
        <div
          v-if="message"
          class="mt-5 px-4 py-3 rounded-lg text-sm text-center font-medium transition-all"
          :class="{
            'bg-green-500/20 text-green-300 border border-green-500/30': messageType === 'success',
            'bg-red-500/20 text-red-300 border border-red-500/30': messageType === 'error',
          }"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>
