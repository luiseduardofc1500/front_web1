import { createRouter, createWebHistory } from 'vue-router'
import SignInView from "@/views/auth/SignInView.vue";
import FormOnly from "@/layouts/FormOnly.vue";
import SignUpView from "@/views/auth/SignUpView.vue";
import HomeView from "@/views/HomeView.vue";
import AddView from "@/views/AddView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      meta: {
        layout: FormOnly,
      },
      component: SignInView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      meta: {
        layout: FormOnly,
      },
      component: SignUpView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
      meta: {
        layout: FormOnly,
      }
    },
  ],
})

export default router
