<template>
  <figure
    v-if="show"
    class="vision-media-figure"
    :class="figureClass"
    v-bind="revealAttrs"
  >
    <VisionMedia :media="media" :alt="caption" />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue'
import VisionMedia from '@/components/vision/VisionMedia.vue'
import { visionMedia, hasVisionMedia } from '@/data/vision-media'

const props = defineProps({
  mediaKey: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  variant: {
    type: String,
    default: 'phase'
  },
  revealDelay: {
    type: [String, Number],
    default: undefined
  },
  revealDirection: {
    type: String,
    default: undefined
  },
  introItem: {
    type: Boolean,
    default: false
  }
})

const media = computed(() => visionMedia[props.mediaKey] ?? { type: 'image', src: '' })
const show = computed(() => hasVisionMedia(props.mediaKey))

const figureClass = computed(() => ({
  'intro-visual': props.variant === 'intro',
  'phase-visual': props.variant === 'phase' || props.variant === 'dark',
  'phase-visual-dark': props.variant === 'dark',
  'intro-item': props.introItem,
  'intro-item-4': props.introItem
}))

const revealAttrs = computed(() => {
  if (props.introItem) return {}
  const attrs = { 'data-reveal': true }
  if (props.revealDelay !== undefined) attrs['data-reveal-delay'] = String(props.revealDelay)
  if (props.revealDirection) attrs['data-reveal-direction'] = props.revealDirection
  return attrs
})
</script>
