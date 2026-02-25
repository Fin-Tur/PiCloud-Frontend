<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 64 64"
    fill="none"
    role="img"
    aria-label="Pi Cloud"
  >
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#6366f1" />
        <stop offset="100%" stop-color="#8b5cf6" />
      </linearGradient>
    </defs>

    <!-- Cloud shadow -->
    <path
      d="M14 46C6 46 0 40 0 33C0 27 4 21.5 10 19.5C11 12 19 7 29 7C37 7 43 11 46 18C47.5 17.5 49 17.5 50.5 18C57 19.5 62 25 62 33C62 40 57 46 50 46Z"
      fill="#4338ca"
      opacity="0.15"
      transform="translate(1, 1.5)"
    />

    <!-- Cloud body -->
    <path
      d="M14 46C6 46 0 40 0 33C0 27 4 21.5 10 19.5C11 12 19 7 29 7C37 7 43 11 46 18C47.5 17.5 49 17.5 50.5 18C57 19.5 62 25 62 33C62 40 57 46 50 46Z"
      :fill="`url(#${gradId})`"
    />

    <!-- Raspberry Pi board — centered in cloud via transform -->
    <g transform="translate(31, 29)">
      <!-- PCB -->
      <rect x="-10" y="-7.5" width="20" height="15" rx="1.5" fill="white" fill-opacity="0.9" />

      <!-- Mounting holes -->
      <circle cx="-8" cy="-5.5" r="0.8" fill="#6366f1" opacity="0.3" />
      <circle cx="8" cy="-5.5" r="0.8" fill="#6366f1" opacity="0.3" />
      <circle cx="-8" cy="5.5" r="0.8" fill="#6366f1" opacity="0.3" />
      <circle cx="8" cy="5.5" r="0.8" fill="#6366f1" opacity="0.3" />

      <!-- GPIO header pins (top edge) -->
      <rect x="-7" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="-5" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="-3" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="-1" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="1" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="3" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="5" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />
      <rect x="7" y="-9.5" width="1" height="3" rx="0.3" fill="white" opacity="0.65" />

      <!-- SoC / CPU chip (centered on board) -->
      <rect x="-3.5" y="-3" width="7" height="7" rx="0.8" fill="#6366f1" opacity="0.55" />
      <rect x="-2" y="-1.5" width="4" height="4" rx="0.4" fill="#6366f1" opacity="0.25" />

      <!-- Ethernet port (right edge) -->
      <rect x="10" y="-5.5" width="3.5" height="5" rx="0.6" fill="white" opacity="0.65" />

      <!-- USB port (right edge) -->
      <rect x="10" y="1" width="3.5" height="4" rx="0.6" fill="white" opacity="0.65" />

      <!-- SD card slot (bottom edge) -->
      <rect x="-2.5" y="7.5" width="5" height="2" rx="0.4" fill="white" opacity="0.55" />

      <!-- Circuit traces -->
      <line x1="-3.5" y1="0.5" x2="-7" y2="0.5" stroke="#6366f1" stroke-width="0.4" opacity="0.25" />
      <line x1="-3.5" y1="2" x2="-6" y2="2" stroke="#6366f1" stroke-width="0.4" opacity="0.25" />
      <line x1="3.5" y1="-0.5" x2="7" y2="-0.5" stroke="#6366f1" stroke-width="0.4" opacity="0.25" />
      <line x1="3.5" y1="1" x2="7" y2="1" stroke="#6366f1" stroke-width="0.4" opacity="0.25" />
    </g>
  </svg>
</template>

<script setup>
import { useId } from 'vue'

defineProps({
  size: {
    type: [Number, String],
    default: 64,
  },
})

const gradId = `pc-cloud-${useId()}`
</script>
