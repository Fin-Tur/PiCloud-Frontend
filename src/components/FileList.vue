<script setup>
import { computed } from 'vue'
import { getFileIcon, formatFileSize } from '@/services/utils.js'

const props = defineProps({
    files: {
        type: Array,
        default: () => [],
    },
})

const emit = defineEmits(['select-file'])

const hasFiles = computed(() => props.files.length > 0)

function onSelectFile(file) {
    emit('select-file', file)
}
</script>

<template>
    <div class="w-full">
        <div
            v-if="!hasFiles"
            class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-8 text-center text-indigo-200"
        >
            <p class="text-lg font-medium">🔍 No files found</p>
        </div>

        <div v-else class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            <article
                v-for="file in files"
                :key="file.id"
                class="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-indigo-900/20 backdrop-blur-xl transition hover:border-indigo-400/40 hover:bg-white/[0.08] active:scale-[0.98]"
                @click="onSelectFile(file)"
            >
                <div class="flex items-center gap-4 min-w-0">
                    <div class="h-14 w-14 shrink-0 rounded-2xl border border-indigo-400/25 bg-indigo-500/20 flex items-center justify-center text-4xl transition group-hover:scale-105">
                        {{ getFileIcon(file.type) }}
                    </div>

                    <div class="min-w-0 flex-1">
                        <p class="truncate text-lg font-bold tracking-tight text-white">{{ file.name }}</p>
                        <p class="mt-0.5 text-sm text-indigo-200/80">{{ file.ownerUsername }}</p>
                        <p class="mt-1 text-xs text-indigo-300/60">
                            {{ formatFileSize(file.size) }} · {{ file.type || 'Unknown' }}
                        </p>
                    </div>

                    <div class="shrink-0 text-indigo-300/40 transition group-hover:text-indigo-300/80">
                        ›
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>