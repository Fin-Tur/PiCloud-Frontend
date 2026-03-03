<script setup>
import { onMounted, ref } from 'vue'
import FileList from '@/components/FileList.vue'
import FileComp from '@/components/FileComp.vue'
import Dashboard from '@/components/Dashboard.vue'
import FileUpload from '@/components/FileUpload.vue'
import { useAuthStore } from '@/stores/auth.js'
import { fetchFiles, cryptFile, deleteFile, downloadFile, getOccupiedSpace, getUsableSpace, uploadFile, pressFile } from '@/services/api.js'
import SearchBar from '@/components/SearchBar.vue'

const authStore = useAuthStore()
const files = ref([])
const filteredFiles = ref([])
const searchQuery = ref('')
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
    filteredFiles.value = files.value
})

function filterFiles(query) {
    searchQuery.value = query
    if (!query) {
        filteredFiles.value = files.value
    } else {
        const lowerQuery = query.toLowerCase()
        filteredFiles.value = files.value.filter(file =>
            file.name.toLowerCase().includes(lowerQuery) ||
            file.type.toLowerCase().includes(lowerQuery)
        )
    }
}

function applyCurrentFilter() {
    filterFiles(searchQuery.value)
}

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
    applyCurrentFilter()
}

async function onToggleCompress(fileId) {
    await pressFile(fileId)
    files.value = await fetchFiles()
    applyCurrentFilter()
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-10">
    <div class="mx-auto flex w-full max-w-8xl flex-col items-center gap-2 lg:flex-row lg:items-start lg:pl-2">
      <div class="w-full ml-18 mt-24 max-w-xs shrink-0 lg:sticky lg:top-10">
        <Dashboard :current-user="authStore.user?.username ?? 'user'" />
      </div>
      <div class="flex-1 min-w-4 w-full lg:ml-4 ">
        <div class="max-w-5xl bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-lg p-6">
          <div class="mb-6">
            <h1 class="text-3xl font-bold tracking-tight text-white">Cloud Files</h1>
            <div class="h-px bg-white/10 my-6"></div>
          </div>
          <div class="mb-6 w-full">
            <SearchBar @search="filterFiles" :max-width="'full'"/>
            <FileUpload @file-upload="uploadFile"></FileUpload>
          </div>
          <div class="h-px bg-white/10 my-6"></div>
          <FileList
            :files="filteredFiles"
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
