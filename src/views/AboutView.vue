<template>
  <section id="about" class="about-section">
    <div class="sci-fi-halo halo-1" aria-hidden="true"></div>
    <div class="sci-fi-halo halo-2" aria-hidden="true"></div>
    <div class="container">
      <div class="about-content">
        <img
          src="https://res.cloudinary.com/dzopbb2j8/image/upload/v1727500706/l9cxgdmtzxbgqrgkhujv.png"
          alt="Toki Fukumoto"
          class="profile-image"
        >
        <div class="about-text">
          <h2>{{ t('about.title') }}</h2>
          <h3>{{ t('about.name') }}</h3>
          <h3>{{ t('about.role') }}</h3>
          <p>{{ t('about.age') }}</p>
          <p>{{ t('about.birthday') }}</p>
          <p>{{ t('about.bloodType') }}</p>
          <p>{{ t('about.birthplace') }}</p>
          <p>{{ t('about.residence') }}</p>
          <p>{{ t('about.tech') }}</p>
          <p>{{ t('about.software') }}</p>
          <h4>{{ t('about.historyTitle') }}</h4>
          <p v-for="(item, index) in historyItems" :key="index">{{ item }}</p>
          <RouterLink to="/records" class="btn">{{ t('about.viewRecords') }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

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
}

.about-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 40px;
}

.profile-image {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.about-text {
  flex: 1;
}

.sci-fi-halo {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(0, 123, 255, 0.5);
  pointer-events: none;
}

.halo-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  animation: rotate 25s linear infinite;
}

.halo-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
  animation: rotate 20s linear infinite reverse;
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
}
</style>
