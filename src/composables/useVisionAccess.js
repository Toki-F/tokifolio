import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'vision-ultra-plan-unlocked'
const ACCESS_KEY = import.meta.env.VITE_VISION_ACCESS_KEY ?? ''

export function useVisionAccess() {
  const isUnlocked = ref(false)
  const hasAccessKey = !!ACCESS_KEY

  onMounted(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') {
      isUnlocked.value = true
    }

    const key = new URLSearchParams(window.location.search).get('key')
    if (key && verifyKey(key)) {
      unlock()
    }
  })

  function verifyKey(key) {
    return hasAccessKey && key === ACCESS_KEY
  }

  function unlock(key) {
    if (key !== undefined && !verifyKey(key)) {
      return false
    }
    isUnlocked.value = true
    sessionStorage.setItem(STORAGE_KEY, '1')
    return true
  }

  function lock() {
    isUnlocked.value = false
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return { isUnlocked, hasAccessKey, verifyKey, unlock, lock }
}
