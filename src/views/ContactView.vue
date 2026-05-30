<template>
  <section id="contact" class="container">
    <h2>{{ t('contact.title') }}</h2>
    <p>{{ t('contact.intro1') }}</p>
    <p>{{ t('contact.intro2') }}</p>

    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      class="contact-form"
    >
      <input type="hidden" name="form-name" value="contact">
      <p class="hidden-field">
        <label>Don't fill this out: <input name="bot-field"></label>
      </p>

      <label for="name">{{ t('contact.nameLabel') }}</label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        name="name"
        required
        :placeholder="t('contact.namePlaceholder')"
      >

      <label for="email">{{ t('contact.emailLabel') }}</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        name="email"
        required
        :placeholder="t('contact.emailPlaceholder')"
      >

      <label for="message">{{ t('contact.messageLabel') }}</label>
      <textarea
        id="message"
        v-model="form.message"
        name="message"
        rows="6"
        required
        :placeholder="t('contact.messagePlaceholder')"
      ></textarea>

      <button type="submit" class="btn">{{ t('contact.submit') }}</button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: ''
})
</script>

<style scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form label {
  font-weight: bold;
  margin-bottom: 5px;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #ffffff;
  box-sizing: border-box;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.contact-form button {
  width: fit-content;
}

.hidden-field {
  display: none;
}
</style>
