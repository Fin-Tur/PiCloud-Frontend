<script setup>

const emit = defineEmits(['file-upload'])

function handleFileUpload(event) {
    const files = Array.from(event.target.files)
    emit('file-upload', files)
}

</script>

<template>
   <div class="mx-left mt-4 mb-8 max-w-lg max-h-sm px-2 ">
      <label
        class="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-indigo-500/40 bg-white/5 px-4 py-4 text-center backdrop-blur-sm transition-all duration-200 hover:border-indigo-400/70 hover:bg-white/10"
      >
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/20 ring-1 ring-indigo-500/30 transition-colors group-hover:bg-indigo-600/35">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-white">Click to upload a file</p>
          <p class="mt-1 text-xs text-slate-400">or drag and drop it here</p>
        </div>
        <input type="file" class="hidden" @change="handleFileUpload" multiple="true"/>
      </label>
    </div>
</template>