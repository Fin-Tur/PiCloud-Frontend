<script setup>

const props = defineProps({
    maxWidth: {
        type: String,
        default: 'md',
    },
})

const emits = defineEmits(['search'])

function onSearch(event) {
    emits('search', event.target.value)
}

</script>

<template>
    <div :class="`relative max-w-${props.maxWidth}`">
        <input
        type="text"
        placeholder="Search files..."
        class="w-full rounded-lg border border-gray-500 bg-white/10 px-4 py-2 text-sm text-white focus:border-indigo-100 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        @input="onSearch"
        />
        <svg
        xmlns="http://www.w3.org/2000/svg"
        class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
        </svg>
    </div>
</template>