export function getFileIcon(type) {
    const normalized = (type || '').toLowerCase()

    if (normalized.includes('pdf')) return '📕'
    if (normalized.includes('image') || normalized.includes('png') || normalized.includes('jpg') || normalized.includes('jpeg') || normalized.includes('gif') || normalized.includes('svg')) return '🖼️'
    if (normalized.includes('zip') || normalized.includes('rar') || normalized.includes('7z') || normalized.includes('tar')) return '🗜️'
    if (normalized.includes('audio') || normalized.includes('mp3') || normalized.includes('wav') || normalized.includes('flac')) return '🎵'
    if (normalized.includes('video') || normalized.includes('mp4') || normalized.includes('mov') || normalized.includes('mkv')) return '🎬'
    if (normalized.includes('text') || normalized.includes('txt') || normalized.includes('md')) return '📄'
    if (normalized.includes('json') || normalized.includes('xml') || normalized.includes('yaml') || normalized.includes('csv')) return '🧾'

    return '📁'
}

export function getFileTypeBadgeClass(type) {
    const normalized = (type || '').toLowerCase()

    if (normalized.includes('image')) return 'bg-emerald-500/15 text-emerald-300 border border-emerald-400/25'
    if (normalized.includes('video')) return 'bg-purple-500/15 text-purple-300 border border-purple-400/25'
    if (normalized.includes('audio')) return 'bg-sky-500/15 text-sky-300 border border-sky-400/25'
    if (normalized.includes('pdf') || normalized.includes('text')) return 'bg-amber-500/15 text-amber-300 border border-amber-400/25'

    return 'bg-indigo-500/15 text-indigo-300 border border-indigo-400/25'
}

export function formatFileSize(size) {
    const bytes = Number(size)
    if (!Number.isFinite(bytes) || bytes < 0) return 'Unknown size'
    if (bytes === 0) return '0 B'

    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
    const value = bytes / (1024 ** index)

    return `${value < 10 && index > 0 ? value.toFixed(1) : value.toFixed(0)} ${units[index]}`
}

export function formatDate(dateValue) {
    if (!dateValue) return 'Unknown date'

    const date = new Date(dateValue)
    if (Number.isNaN(date.getTime())) return 'Unknown date'

    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}