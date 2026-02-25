<script setup>
// ...CloudView logic and imports...

function toggleEncryptFile(fileId) {
  const file = findFile(fileId)
  if (!file) return
  file.encrypted = !file.encrypted
}

function toggleCompressFile(fileId) {
  const file = findFile(fileId)
  if (!file) return
  file.compressed = !file.compressed
}

function moveFile(fileId) {
  const file = findFile(fileId)
  if (!file) return
  console.info(`Move to dir clicked: ${file.name}`)
}

function moveHomeFile(fileId) {
  const file = findFile(fileId)
  if (!file) return
  currentDir.value = '/cloud'
  console.info(`Move to home clicked: ${file.name}`)
}

function deleteFile(fileId) {
  files.value = files.value.filter(file => file.id !== fileId)
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-4 py-10">
    <div class="mx-auto w-full max-w-6xl">
      <div class="mb-6">
        <h1 class="text-3xl font-bold tracking-tight text-white">Cloud Files</h1>
        <p class="mt-1 text-sm text-indigo-300/80">Dummy-Daten zur Vorschau der FileList</p>
      </div>

      <FileList
        :files="files"
        :current-user="currentUser"
        :current-dir="currentDir"
        @download-file="downloadFile"
        @toggle-encrypt-file="toggleEncryptFile"
        @toggle-compress-file="toggleCompressFile"
        @move-file="moveFile"
        @move-home-file="moveHomeFile"
        @delete-file="deleteFile"
      />
    </div>
  </div>
</template>
