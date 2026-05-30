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

      <section class="vision-section vision-locked">
        <template v-if="!isUnlocked">
          <div class="locked-gate">
            <div class="locked-icon" aria-hidden="true">🔒</div>
            <h2>{{ t('vision.lockedTitle') }}</h2>
            <p>{{ t('vision.lockedDesc') }}</p>
            <form class="locked-form" @submit.prevent="handleUnlock">
              <label class="locked-label" for="vision-key">{{ t('vision.keyLabel') }}</label>
              <div class="locked-input-row">
                <input
                  id="vision-key"
                  v-model="keyInput"
                  type="password"
                  :placeholder="t('vision.keyPlaceholder')"
                  autocomplete="off"
                  :disabled="!hasAccessKey"
                />
                <button type="submit" :disabled="!hasAccessKey || !keyInput">
                  {{ t('vision.unlock') }}
                </button>
              </div>
              <p v-if="unlockError" class="locked-error">{{ t('vision.unlockError') }}</p>
              <p v-if="!hasAccessKey" class="locked-note">{{ t('vision.keyNotConfigured') }}</p>
            </form>
          </div>
        </template>

        <template v-else>
          <div class="ultra-plan-toolbar">
            <span class="ultra-plan-badge">{{ t('vision.unlockedBadge') }}</span>
            <button type="button" class="relock-btn" @click="handleLock">
              {{ t('vision.relock') }}
            </button>
          </div>

          <section class="vision-section ultra-intro">
            <p v-html="t('vision.ultraIntro')"></p>
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
        </template>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVisionAccess } from '@/composables/useVisionAccess'

const { t } = useI18n()
const { isUnlocked, hasAccessKey, unlock, lock } = useVisionAccess()

const keyInput = ref('')
const unlockError = ref(false)

function handleUnlock() {
  unlockError.value = false
  if (unlock(keyInput.value)) {
    keyInput.value = ''
    return
  }
  unlockError.value = true
}

function handleLock() {
  lock()
  keyInput.value = ''
  unlockError.value = false
}
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

.vision-locked {
  margin-top: 48px;
  padding-top: 32px;
  border-top: 2px dashed #bdc3c7;
}

.locked-gate {
  text-align: center;
  padding: 32px 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%);
  border: 1px solid #dce1e4;
  border-radius: 10px;
}

.locked-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.locked-gate h2 {
  border-bottom: none;
  font-size: 1.4em;
  margin-bottom: 12px;
  padding-bottom: 0;
}

.locked-gate > p {
  color: #7f8c8d;
  margin-bottom: 24px;
}

.locked-form {
  max-width: 420px;
  margin: 0 auto;
  text-align: left;
}

.locked-label {
  display: block;
  font-size: 0.9em;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 8px;
}

.locked-input-row {
  display: flex;
  gap: 8px;
}

.locked-input-row input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1em;
}

.locked-input-row input:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.locked-input-row button {
  padding: 10px 18px;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.locked-input-row button:disabled,
.locked-input-row input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.locked-input-row button:not(:disabled):hover {
  background: #2980b9;
}

.locked-error {
  margin-top: 12px;
  color: #c0392b;
  font-size: 0.9em;
}

.locked-note {
  margin-top: 12px;
  color: #95a5a6;
  font-size: 0.85em;
}

.ultra-plan-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.ultra-plan-badge {
  display: inline-block;
  background: #2c3e50;
  color: #fff;
  font-size: 0.85em;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 4px;
}

.relock-btn {
  padding: 8px 14px;
  background: transparent;
  color: #7f8c8d;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 0.9em;
  cursor: pointer;
}

.relock-btn:hover {
  color: #2c3e50;
  border-color: #95a5a6;
}

.ultra-intro {
  padding: 20px 24px;
  background: #f8f9fa;
  border-left: 4px solid #2c3e50;
  border-radius: 0 8px 8px 0;
  margin-bottom: 32px;
}
</style>
