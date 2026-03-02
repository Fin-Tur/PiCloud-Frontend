<script setup>
import { ref, watch, computed } from 'vue'
import { getFileIcon, getFileTypeBadgeClass, formatFileSize, formatDate } from '@/services/utils.js'
import PasswordModal from '@/components/PasswordModal.vue'

const props = defineProps({
    file: {
        type: Object,
        default: null,
    },
    visible: {
        type: Boolean,
        default: false,
    },
    currentUser: {
        type: String,
        default: '',
    },
    currentDir: {
        type: String,
        default: '/cloud',
    },
})

const emit = defineEmits(['close', 'download', 'toggle-encrypt', 'toggle-compress', 'move', 'move-home', 'delete'])

const encryptModalVisible = ref(false)

const isOwner = computed(() => props.file?.ownerUsername === props.currentUser)

function onClose() {
    emit('close')
}

function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
        onClose()
    }
}

function onDownload() {
    emit('download', props.file.id)
}

function openEncryptModal() {
    encryptModalVisible.value = true
}

function onEncryptConfirm(password) {
    emit('toggle-encrypt', props.file.id, password)
    encryptModalVisible.value = false
}

function onEncryptCancel() {
    encryptModalVisible.value = false
}

function onToggleCompress() {
    emit('toggle-compress', props.file.id)
}

function onMove() {
    emit('move', props.file.id)
}

function onMoveHome() {
    emit('move-home', props.file.id)
}

function onDelete() {
    emit('delete', props.file.id)
    onClose()
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="visible && file"
                class="fixed inset-0 z-[100] flex items-center justify-center px-4"
                @click="onBackdropClick"
            >
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <!-- Modal -->
                <div class="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl overflow-hidden">

                    <!-- Close Button -->
                    <button
                        type="button"
                        class="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:bg-white/15 hover:text-white cursor-pointer"
                        @click="onClose"
                    >
                        ✕
                    </button>

                    <!-- Header with icon -->
                    <div class="flex items-center gap-5 border-b border-white/10 px-7 py-6">
                        <div class="h-16 w-16 shrink-0 rounded-2xl border border-indigo-400/25 bg-indigo-500/20 flex items-center justify-center text-5xl">
                            {{ getFileIcon(file.type) }}
                        </div>
                        <div class="min-w-0">
                            <h2 class="truncate text-xl font-bold tracking-tight text-white">{{ file.name }}</h2>
                            <div class="mt-1.5 flex items-center gap-2">
                                <span
                                    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                                    :class="getFileTypeBadgeClass(file.type)"
                                >
                                    {{ file.type || 'Unknown' }}
                                </span>
                                <span v-if="file.encrypted" class="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-400/25 px-2.5 py-0.5 text-xs font-medium text-amber-300">
                                    🔒 Encrypted
                                </span>
                                <span v-if="file.compressed" class="inline-flex items-center gap-1 rounded-full bg-cyan-500/15 border border-cyan-400/25 px-2.5 py-0.5 text-xs font-medium text-cyan-300">
                                    📦 Compressed
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- File Details -->
                    <div class="grid grid-cols-2 gap-4 px-7 py-5 border-b border-white/10">
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-indigo-300/50">Size</p>
                            <p class="mt-1 text-sm font-semibold text-white">{{ formatFileSize(file.size) }}</p>
                        </div>
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-indigo-300/50">Owner</p>
                            <p class="mt-1 text-sm font-semibold text-white">{{ file.ownerUsername }}</p>
                        </div>
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-indigo-300/50">Type</p>
                            <p class="mt-1 text-sm font-semibold text-white">{{ file.type || 'Unknown' }}</p>
                        </div>
                        <div>
                            <p class="text-xs font-medium uppercase tracking-wider text-indigo-300/50">Date</p>
                            <p class="mt-1 text-sm font-semibold text-white">{{ formatDate(file.createdAt) }}</p>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="px-7 py-5 space-y-2.5">
                        <p class="text-xs font-medium uppercase tracking-wider text-indigo-300/50 mb-3">Actions</p>

                        <!-- Download - always visible -->
                        <button
                            type="button"
                            class="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-indigo-100 transition hover:bg-indigo-500/15 hover:border-indigo-400/30 cursor-pointer"
                            @click="onDownload"
                        >
                            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-base">📥</span>
                            <span>Download</span>
                        </button>

                        <!-- Owner-only actions -->
                        <template v-if="isOwner">
                            <button
                                type="button"
                                class="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-indigo-100 transition hover:bg-amber-500/15 hover:border-amber-400/30 cursor-pointer"
                                @click="openEncryptModal"
                            >
                                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 text-base">🔒</span>
                                <span>{{ file.encrypted ? 'Decrypt' : 'Encrypt' }}</span>
                            </button>

                            <button
                                type="button"
                                class="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-indigo-100 transition hover:bg-cyan-500/15 hover:border-cyan-400/30 cursor-pointer"
                                @click="onToggleCompress"
                            >
                                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-base">📦</span>
                                <span>{{ file.compressed ? 'Decompress' : 'Compress' }}</span>
                            </button>

                            <button
                                type="button"
                                class="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-indigo-100 transition hover:bg-violet-500/15 hover:border-violet-400/30 cursor-pointer"
                                @click="onMove"
                            >
                                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 text-base">↪</span>
                                <span>Move to Directory</span>
                            </button>

                            <button
                                v-if="currentDir !== '/cloud'"
                                type="button"
                                class="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-indigo-100 transition hover:bg-emerald-500/15 hover:border-emerald-400/30 cursor-pointer"
                                @click="onMoveHome"
                            >
                                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-base">🏠</span>
                                <span>Move to Home</span>
                            </button>

                            <div class="pt-1">
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/20 hover:border-red-400/30 cursor-pointer"
                                    @click="onDelete"
                                >
                                    <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/20 text-base">🗑️</span>
                                    <span>Delete</span>
                                </button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>

    <PasswordModal
        :visible="encryptModalVisible"
        :file-name="file?.name ?? ''"
        @confirm="onEncryptConfirm"
        @cancel="onEncryptCancel"
    />
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}
</style>