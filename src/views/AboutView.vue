<template>
  <section id="about" class="about-section">
    <div class="container">
      <div ref="aboutContent" class="about-content">
        <div class="profile-wrapper">
          <img
            src="https://res.cloudinary.com/dzopbb2j8/image/upload/v1727500706/l9cxgdmtzxbgqrgkhujv.png"
            alt="Toki Fukumoto"
            class="profile-image profile-intro"
          >
        </div>
        <div class="about-text">
          <h2 class="intro-item intro-item-1">{{ t('about.title') }}</h2>
          <h3 class="intro-item intro-item-2">{{ t('about.name') }}</h3>
          <h3 class="intro-item intro-item-3">{{ t('about.role') }}</h3>
          <div class="about-details" data-reveal data-reveal-direction="left">
            <p>{{ t('about.age') }}</p>
            <p>{{ t('about.birthday') }}</p>
            <p>{{ t('about.bloodType') }}</p>
            <p>{{ t('about.birthplace') }}</p>
            <p>{{ t('about.residence') }}</p>
            <p>{{ t('about.tech') }}</p>
            <p>{{ t('about.software') }}</p>
          </div>
          <div class="about-history" data-reveal data-reveal-delay="1">
            <h4>{{ t('about.historyTitle') }}</h4>
            <ul class="stagger-list">
              <li v-for="(item, index) in historyItems" :key="index">{{ item }}</li>
            </ul>
          </div>
          <RouterLink
            to="/records"
            class="btn about-records-btn"
            data-reveal
            data-reveal-delay="2"
          >
            {{ t('about.viewRecords') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { t, tm } = useI18n()

const aboutContent = ref(null)
useScrollReveal(aboutContent)

const historyItems = computed(() => {
  const history = tm('about.history')
  return Array.isArray(history) ? history : []
})
</script>

<style scoped>
.about-section {
  background-color: #f8f8f8;
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}

.about-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 20%, #f8f8f8 70%);
  z-index: 1;
  pointer-events: none;
}

.about-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 40px;
}

.about-content::before {
  content: '';
  position: absolute;
  top: -60px;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
  background-size: 200% 100%;
  animation: shimmer 4s ease-in-out infinite;
}

.profile-wrapper {
  flex-shrink: 0;
}

.profile-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.profile-intro {
  opacity: 0;
  transform: scale(0.82);
  animation: profileFadeIn 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.15s;
}

.about-text {
  flex: 1;
}

.about-details p {
  margin-bottom: 4px;
}

.about-history {
  margin-top: 24px;
}

.about-history h4 {
  margin-bottom: 12px;
}

.about-history ul {
  padding-left: 1.4em;
  margin: 0;
}

.about-history li {
  margin-bottom: 8px;
}

.about-records-btn {
  display: inline-block;
  margin-top: 24px;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.about-records-btn:hover {
  transform: translateY(-2px);
}

.intro-item {
  opacity: 0;
  transform: translateY(24px);
  animation: introFadeIn 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.intro-item-1 { animation-delay: 0.35s; }
.intro-item-2 { animation-delay: 0.5s; }
.intro-item-3 { animation-delay: 0.65s; }

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
[data-reveal].is-revealed .stagger-list li:nth-child(8) { animation-delay: 0.82s; }
[data-reveal].is-revealed .stagger-list li:nth-child(9) { animation-delay: 0.92s; }
[data-reveal].is-revealed .stagger-list li:nth-child(10) { animation-delay: 1.02s; }

.stagger-list li {
  opacity: 0;
  transform: translateX(-12px);
}

@keyframes profileFadeIn {
  from {
    opacity: 0;
    transform: scale(0.82);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
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

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    text-align: center;
  }

  .profile-image {
    width: 200px;
    height: 200px;
  }

  .about-history ul {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile-intro,
  .intro-item,
  [data-reveal],
  .stagger-list li,
  .about-content::before {
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
