// src/js/router.js
import { createRouter, createWebHistory } from 'vue-router';

import index from '../components/index.vue'; // Vista principal
import home from '../components/home.vue'; // Vista de login
import signup from '../components/signup.vue';
import infonote from '../components/infonote.vue';
import search from '../components/search.vue';
import createnote from '../components/createnote.vue';

const routes = [
  { path: '/', component: index },        // Página de inicio
  { path: '/home', component: home },     // Página de login
  { path: '/signup', component: signup },
  { path: '/infonote', component: infonote },
  { path: '/search', component: search },
  { path: '/createnote', component: createnote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
