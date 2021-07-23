import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Home from './views/Home.vue'
import DiscordTimestamps from './views/DiscordTimestamps.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/discordtimestamp', component: DiscordTimestamps },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
