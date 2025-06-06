import './styles/main.scss';
import 'vuetify/styles';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import { createColada } from 'pinia-colada';
import { createVuetify } from 'vuetify';

import App from './App.vue';
import router from './router/index';

const app = createApp(App)
app.use(createPinia())
app.use(createColada())
app.use(createVuetify())
app.use(router)
app.mount('#app')
