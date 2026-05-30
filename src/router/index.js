import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import VisionView from '@/views/VisionView.vue'
import AboutView from '@/views/AboutView.vue'
import RecordsView from '@/views/RecordsView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/vision', name: 'vision', component: VisionView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/records', name: 'records', component: RecordsView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
