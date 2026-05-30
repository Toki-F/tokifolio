<template>
  <main class="container">
    <div class="vision-content">
      <section class="vision-section vision-intro">
        <h1>{{ t('vision.title') }}</h1>
        <p v-html="t('vision.intro')"></p>
        <div class="vision-quote">{{ t('vision.quote') }}</div>
      </section>

      <section class="vision-section phase-section">
        <div class="phase-label">{{ t('vision.phase1Label') }}</div>
        <h2>{{ t('vision.phase1Title') }}</h2>
        <p v-html="t('vision.phase1p1')"></p>
        <h3>{{ t('vision.phase1h1') }}</h3>
        <ul>
          <li v-html="t('vision.phase1item1')"></li>
          <li v-html="t('vision.phase1item2')"></li>
          <li v-html="t('vision.phase1item3')"></li>
          <li v-html="t('vision.phase1item4')"></li>
        </ul>
        <h3>{{ t('vision.phase1h2') }}</h3>
        <p v-html="t('vision.phase1p2')"></p>
        <ul>
          <li v-html="t('vision.phase1item5')"></li>
          <li v-html="t('vision.phase1item6')"></li>
          <li v-html="t('vision.phase1item7')"></li>
        </ul>
        <h3>{{ t('vision.phase1h3') }}</h3>
        <p v-html="t('vision.phase1p3')"></p>
      </section>

      <section class="vision-section phase-section">
        <div class="phase-label">{{ t('vision.phase2Label') }}</div>
        <h2>{{ t('vision.phase2Title') }}</h2>
        <p v-html="t('vision.phase2p1')"></p>
        <h3>{{ t('vision.phase2h1') }}</h3>
        <p v-html="t('vision.phase2p2')"></p>
        <h3>{{ t('vision.phase2h2') }}</h3>
        <p v-html="t('vision.phase2p3')"></p>
        <h3>{{ t('vision.phase2h3') }}</h3>
        <p v-html="t('vision.phase2p4')"></p>
        <h3>{{ t('vision.phase2h4') }}</h3>
        <p v-html="t('vision.phase2p5')"></p>
      </section>

      <section class="vision-section phase-section">
        <div class="phase-label">{{ t('vision.phase3Label') }}</div>
        <h2>{{ t('vision.phase3Title') }}</h2>
        <p v-html="t('vision.phase3p1')"></p>
        <ul>
          <li v-html="t('vision.phase3item1')"></li>
          <li v-html="t('vision.phase3item2')"></li>
          <li v-html="t('vision.phase3item3')"></li>
        </ul>
        <p v-html="t('vision.phase3p2')"></p>
      </section>

      <section class="vision-section phase-section">
        <div class="phase-label">{{ t('vision.phase4Label') }}</div>
        <h2>{{ t('vision.phase4Title') }}</h2>
        <p v-html="t('vision.phase4p1')"></p>
        <ul>
          <li v-html="t('vision.phase4item1')"></li>
          <li v-html="t('vision.phase4item2')"></li>
          <li v-html="t('vision.phase4item3')"></li>
        </ul>
        <p v-html="t('vision.phase4p2')"></p>
      </section>

      <section class="vision-section phase-section phase-final">
        <div class="phase-label">{{ t('vision.phase5Label') }}</div>
        <h2>{{ t('vision.phase5Title') }}</h2>
        <p v-html="t('vision.phase5p1')"></p>
        <h3>{{ t('vision.phase5h1') }}</h3>
        <p v-html="t('vision.phase5p2')"></p>
        <h3>{{ t('vision.phase5h2') }}</h3>
        <ul>
          <li v-html="t('vision.phase5item1')"></li>
          <li v-html="t('vision.phase5item2')"></li>
          <li v-html="t('vision.phase5item3')"></li>
        </ul>
        <p v-html="t('vision.phase5p3')"></p>
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
  margin-bottom: 40px;
}

.vision-intro h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 20px;
  border-bottom: 3px solid #3498db;
  padding-bottom: 12px;
}

.vision-section h2 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.vision-section h3 {
  color: #34495e;
  font-size: 1.2em;
  margin: 24px 0 12px;
}

.phase-label {
  display: inline-block;
  background: #3498db;
  color: #fff;
  font-size: 0.85em;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 4px 14px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.phase-final .phase-label {
  background: #2c3e50;
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
  margin-bottom: 10px;
}
</style>
