import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import CreateAccountView from '../views/CreateAccountView.vue';
import LoginView from '../views/LoginView.vue';
import VerifyEmailView from '@/views/VerifyEmailView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/create-account',
      name: 'Create Account',
      component: CreateAccountView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/verify-email/:email',
      name: 'Verify Email',
      component: VerifyEmailView
    }
  ],
})

export default router
