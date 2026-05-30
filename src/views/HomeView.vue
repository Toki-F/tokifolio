<template>
  <section class="hero">
    <div class="container">
      <h2>{{ t('index.heroName') }}</h2>
      <br>
      <br>
      <br>
      <RouterLink to="/contact" class="btn">{{ t('index.contactBtn') }}</RouterLink>
    </div>
  </section>

  <section id="projects" class="container">
    <h2>{{ t('index.projectsTitle') }}</h2>
    <RouterLink to="/records">{{ t('index.moreLink') }}</RouterLink>
    <div class="projects">
      <div v-for="project in projects" :key="project.title" class="project">
        <h3>{{ project.title }}</h3>
        <p v-html="t(project.descKey)"></p>
        <p>{{ t('index.techLabel') }}{{ project.tech }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const projects = [
  {
    title: 'Tweet App',
    descKey: 'index.projects.tweetApp.desc',
    tech: 'Rails, Ruby, HTML, CSS'
  },
  {
    title: 'Lean Life System',
    descKey: 'index.projects.leanLife.desc',
    tech: 'Rails, Ruby, Python, HTML, CSS, ラズパイ, カメラ'
  },
  {
    title: 'MAYUlink',
    descKey: 'index.projects.mayulink.desc',
    tech: 'Rails, Ruby, Python, HTML, CSS, JavaScript, ラズパイ, カメラ, GPSモジュール, MQTTプロトコル通信'
  },
  {
    title: 'AI Vtuber',
    descKey: 'index.projects.aiVtuber.desc',
    tech: 'JavaScript, miibo, ChatGPT4, VOICEVOX'
  },
  {
    title: 'CANPASS',
    descKey: 'index.projects.canpass.desc',
    tech: 'Rails, Ruby, JavaScript, Next.js, Render, Firebase'
  },
  {
    title: 'Miraizuna',
    descKey: 'index.projects.miraizuna.desc',
    tech: 'Rails, Ruby, JavaScript, Next.js, TypeScript, Heroku, Cloudinary, Cloudflare'
  }
]
</script>

<style scoped>
.hero {
  background-color: #f8f8f8;
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle, transparent 20%, #f8f8f8 70%);
  z-index: 1;
}

.hero .container {
  position: relative;
  z-index: 2;
  text-align: center;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 40px 0;
}

.project {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.project:hover {
  transform: translateY(-5px);
}
</style>
