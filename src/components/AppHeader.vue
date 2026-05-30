<template>
  <header>
    <div class="container header-inner">
      <div class="header-brand">
        <h1>Tokifolio</h1>
        <nav>
          <ul>
            <li><RouterLink to="/">{{ t('nav.home') }}</RouterLink></li>
            <li><RouterLink to="/vision">{{ t('nav.vision') }}</RouterLink></li>
            <li><RouterLink to="/about">{{ t('nav.about') }}</RouterLink></li>
            <li><RouterLink to="/records">{{ t('nav.records') }}</RouterLink></li>
            <li><RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink></li>
          </ul>
        </nav>
      </div>
      <LangSwitcher />
    </div>
  </header>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import LangSwitcher from '@/components/LangSwitcher.vue'

const { t } = useI18n()
</script>
