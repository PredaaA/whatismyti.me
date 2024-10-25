import * as ackeeTracker from 'ackee-tracker';
import { createApp } from 'vue';

import App from './App.vue';
import { router } from './router';
import './index.css';

ackeeTracker.create('https://ackee.predamart.me').record('5b9ea186-a300-4a42-803f-5bc0582b6ca6');

const app = createApp(App)
app.use(router).mount('#app')
