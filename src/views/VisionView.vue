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
        <p v-html="t('vision.s2p1')"></p>
        <ul>
          <li v-html="t('vision.s2item1')"></li>
          <li v-html="t('vision.s2item2')"></li>
          <li v-html="t('vision.s2item3')"></li>
        </ul>
        <p v-html="t('vision.s2p2')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s3Title') }}</h2>
        <p v-html="t('vision.s3p1')"></p>
        <h3 class="vision-subheading">{{ t('vision.s3fusionTitle') }}</h3>
        <p v-html="t('vision.s3fusion')"></p>
        <h3 class="vision-subheading">{{ t('vision.s3skyhookTitle') }}</h3>
        <p v-html="t('vision.s3skyhook')"></p>
        <h3 class="vision-subheading">{{ t('vision.s3massDriverTitle') }}</h3>
        <p v-html="t('vision.s3massDriver')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s4Title') }}</h2>
        <p v-html="t('vision.s4p1')"></p>
        <ul>
          <li v-html="t('vision.s4item1')"></li>
          <li v-html="t('vision.s4item2')"></li>
          <li v-html="t('vision.s4item3')"></li>
          <li v-html="t('vision.s4item4')"></li>
        </ul>
        <p v-html="t('vision.s4p2')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s5Title') }}</h2>
        <p v-html="t('vision.s5p1')"></p>
        <p v-html="t('vision.s5p2')"></p>
      </section>

      <section class="vision-section">
        <h2>{{ t('vision.s6Title') }}</h2>
        <p v-html="t('vision.s6p1')"></p>
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

.vision-subheading {
  color: #34495e;
  font-size: 1.2em;
  margin: 24px 0 12px;
}

.vision-quote {
  font-style: italic;
  font-size: 1.1em;
  color: #34495e;
  border-left: 4px solid #3498db;
  padding-left: 20px;
  margin: 20px 0;
}

.vision-section ul {
  padding-left: 1.4em;
}

.vision-section li {
  margin-bottom: 0.75em;
}
</style>
