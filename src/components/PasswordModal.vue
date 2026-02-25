<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    fileName: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['confirm', 'cancel'])

const password = ref('')
const showPassword = ref(false)

watch(() => props.visible, (val) => {
    if (val) {
        password.value = ''
        showPassword.value = false
    }
})

function onConfirm() {
    if (!password.value.trim()) return
    emit('confirm', password.value)
}

function onCancel() {
    emit('cancel')
}

function onBackdropClick(e) {
    if (e.target === e.currentTarget) {
        onCancel()
    }
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div
                v-if="visible"
                class="fixed inset-0 z-[100] flex items-center justify-center px-4"
                @click="onBackdropClick"
            >
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <!-- Modal -->
                <div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl">
                    <!-- Header -->
                    <div class="mb-5 flex items-center gap-3">
                        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-xl">
                            🔒
                        </div>
                        <div>
                            <h2 class="text-lg font-bold text-white">
                                Enter Password
                            </h2>
                            <p class="text-sm text-indigo-300/70 truncate max-w-[280px]">{{ fileName }}</p>
                        </div>
                    </div>

                    <!-- Password input -->
                    <form @submit.prevent="onConfirm" class="space-y-4">
                        <div>
                            <label class="mb-1.5 block text-sm font-medium text-indigo-200/80">
                                {{ 'Enter password: '}}
                            </label>
                            <div class="relative">
                                <input
                                    v-model="password"
                                    :type="showPassword ? 'text' : 'password'"
                                    placeholder="Password"
                                    required
                                    autofocus
                                    class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 pr-12 text-white placeholder-indigo-300/50 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                                />
                                <button
                                    type="button"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-indigo-300/60 hover:text-indigo-200 transition"
                                    @click="showPassword = !showPassword"
                                >
                                    {{ showPassword ? '✖️' : '👁️' }}
                                </button>
                            </div>
                        </div>

                        <!-- Buttons -->
                        <div class="flex items-center gap-3 pt-1">
                            <button
                                type="submit"
                                class="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-500 active:bg-indigo-700 cursor-pointer"
                            >
                                {{ 'Submit'}}
                            </button>
                            <button
                                type="button"
                                class="flex-1 rounded-lg border border-white/15 bg-white/5 py-2.5 text-sm font-semibold text-indigo-200 transition hover:bg-white/10 cursor-pointer"
                                @click="onCancel"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>
    </Teleport>
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
