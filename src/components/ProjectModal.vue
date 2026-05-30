<template>
  <div
    v-if="isOpen && project"
    class="modal is-open"
    role="dialog"
    aria-modal="true"
    :aria-labelledby="'modalTitle'"
    @click="onBackdropClick"
  >
    <div class="modal-content">
      <button
        type="button"
        class="close-button"
        :aria-label="t('records.close')"
        @click="emit('close')"
      >
        &times;
      </button>

      <div class="modal-media-wrapper">
        <div
          v-if="!mediaLoaded"
          class="modal-loading"
          :class="{ 'is-hidden': mediaLoaded }"
          :aria-label="t('records.loading')"
        >
          <div class="spinner"></div>
        </div>

        <div class="modal-media-inner">
          <video
            v-if="currentItem?.type === 'video'"
            :key="currentItem.src"
            ref="videoRef"
            class="modal-media"
            :class="{ 'is-loaded': mediaLoaded }"
            controls
            playsinline
            preload="metadata"
            @loadeddata="onMediaReady"
            @canplay="onMediaReady"
            @error="onMediaReady"
          >
            <source :src="currentItem.src" :type="getVideoMimeType(currentItem.src)">
          </video>
          <img
            v-else-if="currentItem"
            :key="currentItem.src"
            class="modal-media"
            :class="{ 'is-loaded': mediaLoaded }"
            :src="currentItem.src"
            :alt="localize('title')"
            decoding="async"
            @load="onMediaReady"
            @error="onMediaReady"
          >
        </div>

        <span v-if="mediaItems.length > 1" class="modal-media-counter">
          {{ mediaIndex + 1 }} / {{ mediaItems.length }}
        </span>

        <button
          v-if="mediaItems.length > 1"
          type="button"
          class="navigation-button prev-button"
          :aria-label="t('records.prevMedia')"
          @click.stop="showPrev"
        >
          ←
        </button>
        <button
          v-if="mediaItems.length > 1"
          type="button"
          class="navigation-button next-button"
          :aria-label="t('records.nextMedia')"
          @click.stop="showNext"
        >
          →
        </button>
      </div>

      <h2 id="modalTitle" class="modal-title">{{ localize('title') }}</h2>
      <p class="modal-year">{{ project.year }}</p>
      <div class="modal-description" v-html="localize('detailedDescription')"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  project: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const { t, locale } = useI18n()

const mediaIndex = ref(0)
const mediaLoaded = ref(false)
const videoRef = ref(null)

const mediaItems = computed(() => {
  if (!props.project) return []

  const items = []
  if (props.project.video) {
    items.push({ type: 'video', src: props.project.video })
  }
  if (props.project.images) {
    props.project.images.forEach((img) => {
      items.push({ type: 'image', src: img })
    })
  }
  if (items.length === 0) {
    items.push({ type: 'image', src: props.project.image })
  }
  return items
})

const currentItem = computed(() => mediaItems.value[mediaIndex.value])

function localize(field) {
  if (!props.project) return ''
  const value = props.project[field]
  if (value && typeof value === 'object' && (value.ja || value.en)) {
    return value[locale.value] || value.ja || value.en
  }
  return value
}

function getVideoMimeType(src) {
  if (src.endsWith('.mov')) return 'video/quicktime'
  if (src.endsWith('.webm')) return 'video/webm'
  return 'video/mp4'
}

function onMediaReady() {
  mediaLoaded.value = true
}

function pauseVideos() {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.removeAttribute('src')
    videoRef.value.load()
  }
}

function resetMedia(index = 0) {
  pauseVideos()
  mediaIndex.value = index
  mediaLoaded.value = false
}

function showPrev() {
  const newIndex = (mediaIndex.value - 1 + mediaItems.value.length) % mediaItems.value.length
  resetMedia(newIndex)
}

function showNext() {
  const newIndex = (mediaIndex.value + 1) % mediaItems.value.length
  resetMedia(newIndex)
}

function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

function onKeydown(event) {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
})

watch(
  () => props.project,
  () => resetMedia(0)
)

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      resetMedia(0)
    } else {
      pauseVideos()
    }
  }
)
</script>

<style scoped>
.modal {
  display: flex;
  position: fixed;
  z-index: 1000;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.55);
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.modal-content {
  background-color: #fff;
  padding: 48px 24px 24px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  position: relative;
  box-sizing: border-box;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  border: none;
  background: #f0f0f0;
  border-radius: 50%;
  color: #333;
  padding: 0;
  z-index: 10;
  transition: background-color 0.2s ease;
}

.close-button:hover {
  background: #e0e0e0;
}

.modal-media-wrapper {
  position: relative;
  width: 100%;
  min-height: 280px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.modal-media-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 280px;
}

.modal-media {
  display: block;
  width: 100%;
  max-height: min(420px, 50vh);
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.modal-media.is-loaded {
  opacity: 1;
}

.modal-loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(245, 245, 245, 0.92);
  z-index: 2;
  transition: opacity 0.25s ease;
}

.modal-loading.is-hidden {
  opacity: 0;
  pointer-events: none;
}

.spinner {
  width: 44px;
  height: 44px;
  border: 3px solid #e0e0e0;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
}

.modal-media-counter {
  position: absolute;
  bottom: 10px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.85em;
  padding: 4px 10px;
  border-radius: 12px;
  z-index: 3;
  pointer-events: none;
}

.modal-title {
  font-size: 1.75em;
  margin: 0 0 8px 0;
  padding-right: 32px;
}

.modal-year {
  font-size: 1.1em;
  color: #666;
  margin: 0 0 16px 0;
}

.modal-description {
  font-size: 1em;
  line-height: 1.6;
  margin: 0;
}

.modal-description :deep(h4) {
  margin: 1.2em 0 0.4em;
}

.modal-description :deep(h4:first-child) {
  margin-top: 0;
}

.navigation-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: background-color 0.2s ease;
}

.navigation-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.prev-button {
  left: 12px;
}

.next-button {
  right: 12px;
}

@media (max-width: 768px) {
  .modal-content {
    padding: 44px 16px 16px;
  }

  .modal-media-wrapper,
  .modal-media-inner {
    min-height: 200px;
  }

  .modal-media {
    max-height: min(280px, 40vh);
  }

  .navigation-button {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .prev-button {
    left: 8px;
  }

  .next-button {
    right: 8px;
  }
}
</style>
