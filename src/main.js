import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Home from './views/Home.vue'
import DiscordTimestamps from './views/DiscordTimestamps.vue'
import NotFound from './views/NotFound.vue'
import Privacy from './views/Privacy.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/discordtimestamps', component: DiscordTimestamps },
  { path: '/privacy', component: Privacy },
  { path: '/:pathMatch(.*)*', component: NotFound },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
