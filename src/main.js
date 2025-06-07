import './styles/main.scss';
import 'vuetify/styles';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';

import { PiniaColada } from '@pinia/colada';

import App from './App.vue';
import router from './router/index';

const app = createApp(App)
app.use(createPinia())
app.use(PiniaColada, {})
app.use(createVuetify())
app.use(router)
app.mount('#app')
