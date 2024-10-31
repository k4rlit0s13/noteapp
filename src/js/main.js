// src/js/main.js
import { createApp } from 'vue';
import App from '../components/App.vue'; // Ahora apunta a la ubicación correcta
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
