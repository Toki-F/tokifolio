<template>
  <main class="container">
    <div class="projects-container">
      <div
        v-for="(project, index) in projectsData"
        :key="index"
        class="project-item"
        @click="openModal(project)"
      >
        <img
          :src="project.image"
          :alt="localize(project, 'title')"
          class="project-image"
        >
        <div class="project-info">
          <h2 class="project-title">{{ localize(project, 'title') }}</h2>
          <p class="project-year">{{ project.year }}</p>
          <p class="project-description">{{ localize(project, 'description') }}</p>
        </div>
      </div>
    </div>
  </main>

  <ProjectModal
    :project="selectedProject"
    :is-open="isModalOpen"
    @close="closeModal"
  />
</template>

<script setup>
import { ref } from 'vue'
import { projectsData } from '@/data/records-data'
import { useI18n } from 'vue-i18n'
import ProjectModal from '@/components/ProjectModal.vue'

const { locale } = useI18n()

const isModalOpen = ref(false)
const selectedProject = ref(null)

function localize(project, field) {
  const value = project[field]
  if (value && typeof value === 'object' && (value.ja || value.en)) {
    return value[locale.value] || value.ja || value.en
  }
  return value
}

function openModal(project) {
  selectedProject.value = project
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  isModalOpen.value = false
  selectedProject.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.projects-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 40px 0;
}

.project-item {
  display: flex;
  background-color: #f8f8f8;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

.project-info {
  padding: 20px;
  flex-grow: 1;
}

.project-title {
  font-size: 1.5em;
  margin: 0 0 10px 0;
}

.project-year {
  font-size: 1em;
  color: #666;
  margin: 0 0 10px 0;
}

.project-description {
  font-size: 1em;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .project-item {
    flex-direction: column;
  }

  .project-image {
    width: 100%;
    height: 200px;
  }
}
</style>
