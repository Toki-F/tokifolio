<template>
  <div class="lang-switcher" role="group" aria-label="Language">
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'ja' }"
      :aria-pressed="locale === 'ja'"
      @click="switchLocale('ja')"
    >
      JP
    </button>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      :aria-pressed="locale === 'en'"
      @click="switchLocale('en')"
    >
      EN
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { setLocale } from '@/i18n'

const { locale } = useI18n()

function switchLocale(lang) {
  if (locale.value !== lang) {
    setLocale(lang)
  }
}
</script>
