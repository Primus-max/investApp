import './styles/main.scss';
import 'vuetify/styles';
import 'v-calendar/style.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';
import VCalendar from 'v-calendar';
import VueApexCharts from 'vue3-apexcharts';
import { createVuetify } from 'vuetify';

import { PiniaColada } from '@pinia/colada';

import App from './App.vue';
import router from './router/index';

const app = createApp(App)
app.use(createPinia())
app.use(PiniaColada, {})
app.use(createVuetify())
app.use(router)
app.use(VueApexCharts)
app.use(VCalendar, {})
app.mount('#app')
