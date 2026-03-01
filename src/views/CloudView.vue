<script setup>
import { onMounted, ref } from 'vue'
import FileList from '@/components/FileList.vue'
import FileComp from '@/components/FileComp.vue'
import { useAuthStore } from '@/stores/auth.js'
import { fetchFiles, cryptFile, deleteFile, downloadFile, getOccupiedSpace, getUsableSpace, uploadFile, pressFile } from '@/services/api.js'

const authStore = useAuthStore()
const files = ref([])
const currentDir = ref('/cloud')
const selectedFile = ref(null)
const fileModalVisible = ref(false)

files.value = [{
    id: 1,
    name: 'Example File.txt',
    type: 'text/plain',
    size: 1024,
    ownerUsername: 'john_doe',
    encrypted: false,
    compressed: false,
}]

onMounted(async () => {
    files.value = await fetchFiles()
})

function onSelectFile(file) {
    selectedFile.value = file
    fileModalVisible.value = true
}

function onCloseFileModal() {
    fileModalVisible.value = false
    selectedFile.value = null
}

async function onDelete(fileId) {
    await deleteFile(fileId)
    files.value = files.value.filter(f => f.id !== fileId)
}

async function onToggleEncrypt(fileId, password) {
    await cryptFile(fileId, password)
    files.value = await fetchFiles()
}

async function onToggleCompress(fileId) {
    await pressFile(fileId)
    files.value = await fetchFiles()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-10">
    <div class="mx-auto w-full max-w-6xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold tracking-tight text-white">Cloud Files</h1>
      </div>

      <FileList
        :files="files"
        @select-file="onSelectFile"
      />

      <FileComp
        :file="selectedFile"
        :visible="fileModalVisible"
        :current-user="authStore.user?.username ?? 'john_doe'"
        :current-dir="currentDir"
        @close="onCloseFileModal"
        @download="downloadFile"
        @toggle-encrypt="onToggleEncrypt"
        @toggle-compress="onToggleCompress"
        @move="(id) => { /* TODO: implement */ }"
        @move-home="(id) => { /* TODO: implement */ }"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
