<script setup>  

import { computed } from 'vue'

const props = defineProps({
  strokeColor: {
    type: String,
    default: '#6366f1',
  },
  loading: {
    type: Boolean,
    default: true,
  },
  usableSpace: {
    type: Number,
    default: 2,
  },
  occupiedSpace: {
    type: Number,
    default: 1,
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

const usagePercent = computed(() => {
  if (props.usableSpace <= 0) return 0
  return Math.min(100, Math.round((props.occupiedSpace / props.usableSpace) * 100))
})

const circumference = 2 * Math.PI * 54//can be changed
const dashOffset = computed(() => {
  return circumference - (usagePercent.value / 100) * circumference
})

const strokeColor = computed(() => {
  if (usagePercent.value === 0) return 'transparent'
  if (usagePercent.value > 90) return '#ef4444'
  if (usagePercent.value > 70) return '#f59e0b'
  return '#6366f1'
})

</script>

<template>

      <div v-if="loading" class="flex h-32 w-32 items-center justify-center">
        <svg class="h-8 w-8 animate-spin text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>

      <div v-else class="relative flex items-center justify-center">
        <svg width="128" height="128" viewBox="0 0 120 120" class="-rotate-90">
          <!-- Background ring -->
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="currentColor"
            class="text-white/10"
            stroke-width="8"
          />
          <!-- Progress ring -->
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            :stroke="strokeColor"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
            class="transition-all duration-700 ease-out"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-bold text-white">{{ usagePercent }}%</span>
          <span class="text-[10px] text-slate-400">used</span>
        </div>
      </div>

</template>