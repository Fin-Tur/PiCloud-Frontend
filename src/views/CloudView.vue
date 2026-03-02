<script setup>
import { onMounted, ref } from 'vue'
import FileList from '@/components/FileList.vue'
import FileComp from '@/components/FileComp.vue'
import Dashboard from '@/components/Dashboard.vue'
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
    <!-- Mobile: stacked / Desktop: side by side -->
    <div class="mx-auto flex w-full max-w-8xl flex-col items-center gap-2 lg:flex-row lg:items-start lg:pl-2">
      <!-- Dashboard – links auf Desktop, oben auf Mobil -->
      <div class="w-full ml-24 mt-24 max-w-xs shrink-0 lg:sticky lg:top-10">
        <Dashboard :current-user="authStore.user?.username ?? 'user'" />
      </div>
      <div class="flex-1 min-w-4 w-full lg:ml-32">
        <div class="max-w-5xl">
          <div class="mb-6">
            <h1 class="text-3xl font-bold tracking-tight text-white">Cloud Files</h1>
          </div>

          <FileList
            :files="files"
            @select-file="onSelectFile"
          />
        </div>
      </div>
    </div>

    <FileComp
      :file="selectedFile"
      :visible="fileModalVisible"
      :current-user="authStore.user?.username ?? 'user'"
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
</template>
