<script setup>
import { ref, onMounted, computed } from 'vue'
import { getUsableSpace, getOccupiedSpace, logout } from '@/services/api.js'
import { formatFileSize } from '@/services/utils.js'
import CircularProgressBar from './CircularProgressBar.vue'

const props = defineProps({
  currentUser: {
    type: String,
    default: '',
  },
})

const usableSpace = ref(0)
const occupiedSpace = ref(0)
const loading = ref(true)


onMounted(async () => {
  try {
    usableSpace.value = await getUsableSpace()
    occupiedSpace.value = await getOccupiedSpace()
  } catch (e) {
    console.error('Failed to load storage info:', e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <aside class="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-8 w-64 shrink-0">
    <!-- User -->
    <div class="flex flex-col items-center gap-3">
      <div class="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
      <div class="text-center">
        <p class="text-xs uppercase tracking-wider text-slate-400">Logged in as</p>
        <p class="mt-0.5 text-sm font-semibold text-white truncate max-w-[180px]">{{ currentUser }}</p>
      </div>
    </div>

    <div class="h-px w-full bg-white/10" />

    <!-- Storage circle -->
    <div class="flex flex-col items-center gap-3">
      <p class="text-xs uppercase tracking-wider text-slate-400">Storage</p>

      <CircularProgressBar :usable-space="usableSpace" :occupied-space="occupiedSpace" :loading="loading" />

      <div v-if="!loading" class="w-full space-y-1.5 text-xs text-slate-300">
        <div class="flex justify-between">
          <span>Used</span>
          <span class="font-medium text-white">{{ formatFileSize(occupiedSpace) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Available</span>
          <span class="font-medium text-white">{{ formatFileSize(usableSpace - occupiedSpace) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Total</span>
          <span class="font-medium text-white">{{ formatFileSize(usableSpace) }}</span>
        </div>
      </div>
    </div>

    <div class="mt-auto h-px w-full bg-white/10" />

    <!-- Logout -->
    <button
      @click="logout"
      class="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white cursor-pointer"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Logout
    </button>
  </aside>
</template>