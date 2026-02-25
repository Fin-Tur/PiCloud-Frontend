<script setup>
import { computed, ref } from 'vue'
import { getFileIcon, formatFileSize } from '@/services/utils.js'
import EncryptionModal from '@/components/PasswordModal.vue'

const props = defineProps({
    files: {
        type: Array,
        default: () => [],
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

const emit = defineEmits([
    'download-file',
    'toggle-encrypt-file',
    'toggle-compress-file',
    'move-file',
    'move-home-file',
    'delete-file',
])

const openDropdownId = ref(null)
const encryptModalVisible = ref(false)
const encryptTargetFile = ref(null)

const hasFiles = computed(() => props.files.length > 0)

function isOwner(file) {
    return file.ownerUsername === props.currentUser
}

function toggleDropdown(fileId) {
    openDropdownId.value = openDropdownId.value === fileId ? null : fileId
}

function closeDropdown() {
    openDropdownId.value = null
}


function onDownload(fileId) {
    emit('download-file', fileId)
}

function openEncryptModal(file) {
    encryptTargetFile.value = file
    encryptModalVisible.value = true
    closeDropdown()
}

function onEncryptConfirm(password) {
    if (encryptTargetFile.value) {
        emit('toggle-encrypt-file', encryptTargetFile.value.id, password)
    }
    encryptModalVisible.value = false
    encryptTargetFile.value = null
}

function onEncryptCancel() {
    encryptModalVisible.value = false
    encryptTargetFile.value = null
}

function onToggleCompress(fileId) {
    emit('toggle-compress-file', fileId)
    closeDropdown()
}

function onMove(fileId) {
    emit('move-file', fileId)
    closeDropdown()
}

function onMoveHome(fileId) {
    emit('move-home-file', fileId)
    closeDropdown()
}

function onDelete(fileId) {
    emit('delete-file', fileId)
}
</script>

<template>
    <div class="w-full" @click="closeDropdown">
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
                class="relative overflow-visible rounded-2xl border border-white/10 bg-white/5 px-4 py-4 shadow-lg shadow-indigo-900/20 backdrop-blur-xl transition hover:border-indigo-400/40"
                :class="openDropdownId === file.id ? 'z-40' : 'z-0'"
            >
                <div class="flex items-center justify-between gap-4">
                    <div class="flex items-center gap-4 min-w-0">
                        <div class="h-14 w-14 shrink-0 rounded-2xl border border-indigo-400/25 bg-indigo-500/20 flex items-center justify-center text-4xl">
                            {{ getFileIcon(file.type) }}
                        </div>

                        <div class="min-w-0">
                            <p class="truncate text-lg font-bold tracking-tight text-white">{{ file.name }}</p>
                            <p class="mt-0.5 text-sm text-indigo-200/80">Owner: {{ file.ownerUsername }}</p>

                            <p class="mt-1 text-xs text-indigo-300/60">
                                {{ formatFileSize(file.size) }} · {{ file.type || 'Unknown' }}
                            </p>
                        </div>
                    </div>

                    <div class="relative shrink-0" @click.stop>
                        <button
                            type="button"
                            class="rounded-xl border border-white/15 bg-white/10 p-2.5 text-lg text-white/80 transition hover:bg-white/20"
                            @click="toggleDropdown(file.id)"
                        >
                            ⋮
                        </button>

                        <div
                            v-if="openDropdownId === file.id"
                            class="absolute right-0 top-full z-50 mt-2 w-56 rounded-2xl border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-xl"
                        >
                            <button
                                type="button"
                                class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-white/10"
                                @click="onDownload(file.id)"
                            >
                                📥 <span>Download</span>
                            </button>

                            <template v-if="isOwner(file)">
                                <div class="mx-3 my-1 border-t border-white/10"></div>

                                <button
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-white/10"
                                    @click="openEncryptModal(file)"
                                >
                                    🔒 <span>{{ file.encrypted ? 'Decrypt' : 'Encrypt' }}</span>
                                </button>
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-white/10"
                                    @click="onToggleCompress(file.id)"
                                >
                                    📦 <span>{{ file.compressed ? 'Decompress' : 'Compress' }}</span>
                                </button>
                                <button
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-white/10"
                                    @click="onMove(file.id)"
                                >
                                    ↪ <span>Move to Dir</span>
                                </button>
                                <button
                                    v-if="currentDir !== '/cloud'"
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-indigo-100 transition hover:bg-white/10"
                                    @click="onMoveHome(file.id)"
                                >
                                    🏠 <span>Move to Home</span>
                                </button>

                                <div class="mx-3 my-1 border-t border-white/10"></div>

                                <button
                                    type="button"
                                    class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-300 transition hover:bg-red-500/15"
                                    @click="onDelete(file.id)"
                                >
                                    🗑️ <span>Delete</span>
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </article>
        </div>

        <EncryptionModal
            :visible="encryptModalVisible"
            :file-name="encryptTargetFile?.name ?? ''"
            @confirm="onEncryptConfirm"
            @cancel="onEncryptCancel"
        />
    </div>
</template>