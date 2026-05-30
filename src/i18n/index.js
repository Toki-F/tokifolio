import { createI18n } from 'vue-i18n'
import ja from '@/locales/ja.json'
import en from '@/locales/en.json'

const STORAGE_KEY = 'tokifolio-lang'

function getInitialLocale() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'ja' || stored === 'en') {
    return stored
  }
  return navigator.language.startsWith('ja') ? 'ja' : 'en'
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: { ja, en }
})

export function setLocale(locale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
  document.documentElement.lang = locale
  updateMetaTags(locale)
}

function updateMetaTags(locale) {
  const messages = i18n.global.messages.value[locale]?.meta
  if (!messages) return

  document.title = messages.title

  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.content = messages.description

  const ogTitle = document.querySelector('meta[property="og:title"]')
  if (ogTitle) ogTitle.content = messages.ogTitle

  const ogDesc = document.querySelector('meta[property="og:description"]')
  if (ogDesc) ogDesc.content = messages.ogDescription
}

setLocale(i18n.global.locale.value)

export default i18n
