import { createRouter, createWebHistory } from 'vue-router'
import Profile from '../views/Profile.vue';
import AuthCallback from '../views/auth/AuthCallback.vue';
import LogInView from '../views/auth/LogInView.vue';
import RegisterView from '../views/auth/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: LogInView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RegisterView,
    },
    {
      path: "/auth/callback",
      name: 'auth-callback',
      component: AuthCallback,
    },
    {
      path:"/profile",
      name: 'profile',
      component: Profile,
    },
  ],
})

export default router
