<template>
  <main class="container">
    <div class="vision-content">
      <section class="vision-section">
        <h2>{{ t('vision.s1Title') }}</h2>
        <p v-html="t('vision.s1p1')"></p>
        <div class="vision-quote">{{ t('vision.s1quote') }}</div>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s2Title') }}</h2>
        <p>{{ t('vision.s2p1') }}</p>
        <ol>
          <li v-html="t('vision.s2phase1')"></li>
          <li v-html="t('vision.s2phase2')"></li>
          <li v-html="t('vision.s2phase3')"></li>
          <li v-html="t('vision.s2phase4')"></li>
          <li v-html="t('vision.s2phase5')"></li>
        </ol>
        <p>{{ t('vision.s2p2') }}</p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s3Title') }}</h2>
        <ul>
          <li>AI</li>
          <li>IT</li>
          <li>IoT</li>
          <li>{{ t('vision.s3mobility') }}</li>
          <li>{{ t('vision.s3blockchain') }}</li>
          <li>{{ t('vision.s3fusion') }}</li>
          <li>{{ t('vision.s3space') }}</li>
        </ul>
        <p v-html="t('vision.s3p1')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s4Title') }}</h2>
        <p v-html="t('vision.s4p1')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s5Title') }}</h2>
        <p>{{ t('vision.s5p1') }}</p>
        <ul>
          <li v-html="t('vision.s5item1')"></li>
          <li v-html="t('vision.s5item2')"></li>
          <li v-html="t('vision.s5item3')"></li>
        </ul>
        <p>{{ t('vision.s5p2') }}</p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s6Title') }}</h2>
        <p v-html="t('vision.s6p1')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s7Title') }}</h2>
        <p v-html="t('vision.s7p1')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s8Title') }}</h2>
        <p v-html="t('vision.s8p1')"></p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.vision-content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.8;
}

.vision-section {
  margin-bottom: 30px;
}

.vision-section h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.vision-quote {
  font-style: italic;
  font-size: 1.1em;
  color: #34495e;
  border-left: 4px solid #3498db;
  padding-left: 20px;
  margin: 20px 0;
}
</style>
