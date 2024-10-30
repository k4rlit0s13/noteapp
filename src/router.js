// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/home.vue';
import Signup from './components/signup.vue';
import Infonote from './components/infonote.vue';
import Search from './components/search.vue';
import CreateNote from './components/createnote.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/infonote', name: 'Infonote', component: Infonote },
  { path: '/search', name: 'Search', component: Search },
  { path: '/createnote', name: 'CreateNote', component: CreateNote },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
