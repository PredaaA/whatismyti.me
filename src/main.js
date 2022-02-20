import * as ackeeTracker from 'ackee-tracker';
import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './App.vue';
import './index.css';
import DiscordTimestamps from './views/DiscordTimestamps.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import Privacy from './views/Privacy.vue';


ackeeTracker.create('https://ackee.predamart.me').record('5b9ea186-a300-4a42-803f-5bc0582b6ca6');

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
