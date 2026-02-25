<script setup>
import { ref } from 'vue'

defineProps({
  currentUser: {
    type: String,
    default: '',
  },
  currentView: {
    type: String,
    default: 'cloud',
  },
})

defineEmits(['cloud', 'dirs'])

function switchToCloud() {
  emit('cloud')
}

function switchToDirs() {
  emit('dirs')
}

</script>