<template>
  <div class="vision-media">
    <video
      v-if="media.type === 'video'"
      class="vision-media__video"
      :src="media.src"
      :poster="media.poster || undefined"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      :aria-label="alt"
    />
    <img
      v-else
      class="vision-media__image"
      :src="media.src"
      :alt="alt"
      loading="lazy"
      decoding="async"
    />
  </div>
</template>

<script setup>
defineProps({
  media: {
    type: Object,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.vision-media {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 10;
}

.vision-media__video,
.vision-media__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
