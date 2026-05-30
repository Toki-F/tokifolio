<template>
  <main class="container">
    <div ref="visionContent" class="vision-content">
      <!-- Intro -->
      <section class="vision-section vision-intro">
        <div class="intro-grid">
          <div class="intro-text">
            <h1 class="intro-item intro-item-1">{{ t('vision.title') }}</h1>
            <p class="intro-item intro-item-2" v-html="t('vision.intro')"></p>
            <div class="vision-quote intro-item intro-item-3">{{ t('vision.quote') }}</div>
          </div>
          <figure class="intro-visual intro-item intro-item-4 is-revealed">
            <VisionDiagram type="intro" :caption="t('vision.diagrams.intro')" />
            <figcaption>{{ t('vision.diagrams.intro') }}</figcaption>
          </figure>
        </div>
      </section>

      <!-- Phase 1 -->
      <section class="vision-section">
        <div class="phase-block" data-reveal>
          <div class="phase-label">{{ t('vision.phase1Label') }}</div>
          <h2>{{ t('vision.phase1Title') }}</h2>
          <p v-html="t('vision.phase1p1')"></p>
        </div>

        <div class="phase-split">
          <div class="phase-text" data-reveal data-reveal-direction="left">
            <h3>{{ t('vision.phase1h1') }}</h3>
            <ul class="stagger-list">
              <li v-html="t('vision.phase1item1')"></li>
              <li v-html="t('vision.phase1item2')"></li>
              <li v-html="t('vision.phase1item3')"></li>
              <li v-html="t('vision.phase1item4')"></li>
            </ul>
          </div>
          <figure class="phase-visual" data-reveal data-reveal-delay="3" data-reveal-direction="right">
            <VisionDiagram type="nexus" :caption="t('vision.diagrams.nexus')" />
            <figcaption>{{ t('vision.diagrams.nexus') }}</figcaption>
          </figure>
        </div>

        <div class="phase-split phase-split-reverse">
          <figure class="phase-visual" data-reveal data-reveal-delay="1" data-reveal-direction="left">
            <VisionDiagram type="sda" :caption="t('vision.diagrams.sda')" />
            <figcaption>{{ t('vision.diagrams.sda') }}</figcaption>
          </figure>
          <div class="phase-text" data-reveal data-reveal-delay="3" data-reveal-direction="right">
            <h3>{{ t('vision.phase1h2') }}</h3>
            <p v-html="t('vision.phase1p2')"></p>
            <ul class="stagger-list">
              <li v-html="t('vision.phase1item5')"></li>
              <li v-html="t('vision.phase1item6')"></li>
              <li v-html="t('vision.phase1item7')"></li>
            </ul>
          </div>
        </div>

        <div class="phase-block" data-reveal>
          <h3>{{ t('vision.phase1h3') }}</h3>
          <p v-html="t('vision.phase1p3')"></p>
        </div>
      </section>

      <!-- Locked section -->
      <section class="vision-section vision-locked">
        <div class="phase-block" data-reveal>
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
        </div>

        <Transition name="vision-unlock" @after-enter="refreshReveal">
          <div v-if="isUnlocked" class="unlocked-content">
            <div class="ultra-plan-toolbar" data-reveal>
              <span class="ultra-plan-badge">{{ t('vision.unlockedBadge') }}</span>
              <button type="button" class="relock-btn" @click="handleLock">
                {{ t('vision.relock') }}
              </button>
            </div>

            <div class="phase-block ultra-intro" data-reveal>
              <p v-html="t('vision.ultraIntro')"></p>
            </div>

            <!-- Phase 2 -->
            <section class="vision-section">
              <div class="phase-block" data-reveal>
                <div class="phase-label">{{ t('vision.phase2Label') }}</div>
                <h2>{{ t('vision.phase2Title') }}</h2>
                <p v-html="t('vision.phase2p1')"></p>
              </div>

              <div class="phase-split">
                <div class="phase-text" data-reveal data-reveal-direction="left">
                  <h3>{{ t('vision.phase2h1') }}</h3>
                  <p v-html="t('vision.phase2p2')"></p>
                </div>
                <figure class="phase-visual" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <VisionDiagram type="skyhook" :caption="t('vision.diagrams.skyhook')" />
                  <figcaption>{{ t('vision.diagrams.skyhook') }}</figcaption>
                </figure>
              </div>

              <div class="phase-split phase-split-reverse">
                <figure class="phase-visual" data-reveal data-reveal-delay="1" data-reveal-direction="left">
                  <VisionDiagram type="fusion" :caption="t('vision.diagrams.fusion')" />
                  <figcaption>{{ t('vision.diagrams.fusion') }}</figcaption>
                </figure>
                <div class="phase-text" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <h3>{{ t('vision.phase2h2') }}</h3>
                  <p v-html="t('vision.phase2p3')"></p>
                </div>
              </div>

              <div class="phase-split">
                <div class="phase-text" data-reveal data-reveal-direction="left">
                  <h3>{{ t('vision.phase2h3') }}</h3>
                  <p v-html="t('vision.phase2p4')"></p>
                </div>
                <figure class="phase-visual" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <VisionDiagram type="mass-driver" :caption="t('vision.diagrams.massDriver')" />
                  <figcaption>{{ t('vision.diagrams.massDriver') }}</figcaption>
                </figure>
              </div>

              <div class="phase-block" data-reveal>
                <h3>{{ t('vision.phase2h4') }}</h3>
                <p v-html="t('vision.phase2p5')"></p>
              </div>
            </section>

            <!-- Phase 3 -->
            <section class="vision-section">
              <div class="phase-split">
                <div class="phase-text" data-reveal data-reveal-direction="left">
                  <div class="phase-label">{{ t('vision.phase3Label') }}</div>
                  <h2>{{ t('vision.phase3Title') }}</h2>
                  <p v-html="t('vision.phase3p1')"></p>
                </div>
                <figure class="phase-visual" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <VisionDiagram type="mars" :caption="t('vision.diagrams.mars')" />
                  <figcaption>{{ t('vision.diagrams.mars') }}</figcaption>
                </figure>
              </div>

              <div class="phase-block" data-reveal>
                <ul class="stagger-list">
                  <li v-html="t('vision.phase3item1')"></li>
                  <li v-html="t('vision.phase3item2')"></li>
                  <li v-html="t('vision.phase3item3')"></li>
                </ul>
                <p v-html="t('vision.phase3p2')"></p>
              </div>
            </section>

            <!-- Phase 4 -->
            <section class="vision-section">
              <div class="phase-split phase-split-reverse">
                <figure class="phase-visual" data-reveal data-reveal-delay="1" data-reveal-direction="left">
                  <VisionDiagram type="galaxy" :caption="t('vision.diagrams.galaxy')" />
                  <figcaption>{{ t('vision.diagrams.galaxy') }}</figcaption>
                </figure>
                <div class="phase-text" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <div class="phase-label">{{ t('vision.phase4Label') }}</div>
                  <h2>{{ t('vision.phase4Title') }}</h2>
                  <p v-html="t('vision.phase4p1')"></p>
                </div>
              </div>

              <div class="phase-block" data-reveal>
                <ul class="stagger-list">
                  <li v-html="t('vision.phase4item1')"></li>
                  <li v-html="t('vision.phase4item2')"></li>
                  <li v-html="t('vision.phase4item3')"></li>
                </ul>
                <p v-html="t('vision.phase4p2')"></p>
              </div>
            </section>

            <!-- Phase 5 -->
            <section class="vision-section phase-final">
              <div class="phase-split">
                <div class="phase-text" data-reveal data-reveal-direction="left">
                  <div class="phase-label">{{ t('vision.phase5Label') }}</div>
                  <h2>{{ t('vision.phase5Title') }}</h2>
                  <p v-html="t('vision.phase5p1')"></p>
                </div>
                <figure class="phase-visual phase-visual-dark" data-reveal data-reveal-delay="3" data-reveal-direction="right">
                  <VisionDiagram type="blackhole" :caption="t('vision.diagrams.blackhole')" />
                  <figcaption>{{ t('vision.diagrams.blackhole') }}</figcaption>
                </figure>
              </div>

              <div class="phase-block" data-reveal>
                <h3>{{ t('vision.phase5h1') }}</h3>
                <p v-html="t('vision.phase5p2')"></p>
              </div>

              <div class="phase-block" data-reveal>
                <h3>{{ t('vision.phase5h2') }}</h3>
                <ul class="stagger-list">
                  <li v-html="t('vision.phase5item1')"></li>
                  <li v-html="t('vision.phase5item2')"></li>
                  <li v-html="t('vision.phase5item3')"></li>
                </ul>
                <p v-html="t('vision.phase5p3')"></p>
              </div>
            </section>
          </div>
        </Transition>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useVisionAccess } from '@/composables/useVisionAccess'
import { useScrollReveal } from '@/composables/useScrollReveal'
import VisionDiagram from '@/components/vision/VisionDiagram.vue'

const { t } = useI18n()
const { isUnlocked, hasAccessKey, unlock, lock } = useVisionAccess()

const visionContent = ref(null)
const { refresh: refreshReveal } = useScrollReveal(visionContent)

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
  position: relative;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 30px;
  margin-top: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.8;
  overflow: hidden;
}

.vision-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
  background-size: 200% 100%;
  animation: shimmer 4s ease-in-out infinite;
}

.vision-section {
  margin-bottom: 48px;
}

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
}

.intro-visual,
.phase-visual {
  margin: 0;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #ecf0f1 100%);
  border-radius: 12px;
  border: 1px solid #dce1e4;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.phase-visual-dark {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-color: #2c3e50;
}

.intro-visual figcaption,
.phase-visual figcaption {
  margin-top: 12px;
  text-align: center;
  font-size: 0.85em;
  color: #7f8c8d;
  font-style: italic;
}

.phase-visual-dark figcaption {
  color: #bdc3c7;
}

.phase-block {
  margin-bottom: 36px;
}

.phase-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 36px;
}

.phase-split-reverse .phase-visual {
  order: -1;
}

.phase-text {
  min-width: 0;
}

.intro-item {
  opacity: 0;
  transform: translateY(24px);
  animation: introFadeIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.intro-item-1 { animation-delay: 0.1s; }
.intro-item-2 { animation-delay: 0.28s; }
.intro-item-3 { animation-delay: 0.46s; }
.intro-item-4 { animation-delay: 0.64s; }

[data-reveal] {
  opacity: 0;
  transform: translateY(36px);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

[data-reveal][data-reveal-direction='left'] {
  transform: translateX(-40px) translateY(20px);
}

[data-reveal][data-reveal-direction='right'] {
  transform: translateX(40px) translateY(20px);
}

[data-reveal].is-revealed {
  opacity: 1;
  transform: translate(0, 0);
}

[data-reveal].is-revealed .stagger-list li {
  animation: listItemFadeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

[data-reveal].is-revealed .stagger-list li:nth-child(1) { animation-delay: 0.12s; }
[data-reveal].is-revealed .stagger-list li:nth-child(2) { animation-delay: 0.22s; }
[data-reveal].is-revealed .stagger-list li:nth-child(3) { animation-delay: 0.32s; }
[data-reveal].is-revealed .stagger-list li:nth-child(4) { animation-delay: 0.42s; }
[data-reveal].is-revealed .stagger-list li:nth-child(5) { animation-delay: 0.52s; }
[data-reveal].is-revealed .stagger-list li:nth-child(6) { animation-delay: 0.62s; }
[data-reveal].is-revealed .stagger-list li:nth-child(7) { animation-delay: 0.72s; }

.stagger-list li {
  opacity: 0;
  transform: translateX(-12px);
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
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.35);
}

.phase-final .phase-label {
  background: #2c3e50;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.35);
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
  animation: lockPulse 2.5s ease-in-out infinite;
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
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
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
  transition: background-color 0.25s ease, transform 0.2s ease;
}

.locked-input-row button:disabled,
.locked-input-row input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.locked-input-row button:not(:disabled):hover {
  background: #2980b9;
  transform: translateY(-1px);
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

.vision-unlock-enter-active {
  transition:
    opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.vision-unlock-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.vision-unlock-enter-from,
.vision-unlock-leave-to {
  opacity: 0;
  transform: translateY(20px);
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
  animation: badgeGlow 2s ease-in-out infinite;
}

.relock-btn {
  padding: 8px 14px;
  background: transparent;
  color: #7f8c8d;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 0.9em;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease;
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

@keyframes introFadeIn {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes listItemFadeIn {
  from { opacity: 0; transform: translateX(-12px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes lockPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.85; }
}

@keyframes badgeGlow {
  0%, 100% { box-shadow: 0 0 0 rgba(44, 62, 80, 0); }
  50% { box-shadow: 0 0 16px rgba(44, 62, 80, 0.35); }
}

@media (max-width: 768px) {
  .intro-grid,
  .phase-split {
    grid-template-columns: 1fr;
  }

  .phase-split-reverse .phase-visual {
    order: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .intro-item,
  [data-reveal],
  .stagger-list li,
  .locked-icon,
  .ultra-plan-badge,
  .vision-content::before {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  [data-reveal].is-revealed .stagger-list li {
    animation: none !important;
  }
}
</style>
