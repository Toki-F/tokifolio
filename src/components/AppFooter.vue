<template>
  <footer>
    <div class="container">
      <p>{{ t('footer') }}</p>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
