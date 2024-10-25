import { createRouter, createWebHistory } from 'vue-router';

import DiscordTimestamps from './views/DiscordTimestamps.vue';
import Home from './views/Home.vue';
import NotFound from './views/NotFound.vue';
import Privacy from './views/Privacy.vue';

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/discordtimestamps', component: DiscordTimestamps },
        { path: '/privacy', component: Privacy },
        { path: '/:pathMatch(.*)*', component: NotFound },
    ],
})
