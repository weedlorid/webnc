import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // <- import router
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
// dùng Pinia trong app
app.use(pinia)
app.use(router) // <- dùng router
app.mount('#app')
