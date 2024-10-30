// src/js/main.js
import { createApp } from 'vue';
import App from '../components/index.vue';
import router from '../router';

const app = createApp(App);
app.use(router);
app.mount('#app');
