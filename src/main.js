import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/styles/base.css'
import './assets/styles/i18n.css'

createApp(App).use(router).use(i18n).mount('#app')
