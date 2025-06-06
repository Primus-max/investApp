import '../styles/main.scss';
import 'vuetify/styles';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import { createColada } from 'pinia-colada';
import { createVuetify } from 'vuetify';

import router from '../router/index';
import App from './App.vue';

const app = createApp(App)
app.use(createPinia())
app.use(createColada())
app.use(createVuetify())
app.use(router)
app.mount('#app')
