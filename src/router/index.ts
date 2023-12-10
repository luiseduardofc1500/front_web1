import { createRouter, createWebHistory } from 'vue-router'
import SignInView from "@/views/auth/SignInView.vue";
import FormOnly from "@/layouts/FormOnly.vue";
import SignUpView from "@/views/auth/SignUpView.vue";
import HomeView from "@/views/HomeView.vue";
import AddView from "@/views/AddView.vue";
import {useAuthenticationStore} from "@/lib/infrastructure/repository/store/authentication";

const guest = (to: any, from: any, next: any) => {
  const authenticationStore = useAuthenticationStore()

  if (authenticationStore.isAuthenticated) {
      return next({name: 'home'})
  }

  return next()
}

const authenticated = (to: any, from: any, next: any) => {
  const authenticationStore = useAuthenticationStore()

  if (!authenticationStore.isAuthenticated) {
      return next({name: 'sign-in'})
  }

  return next()
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      beforeEnter: guest,
      meta: {
        layout: FormOnly,
      },
      component: SignInView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      beforeEnter: guest,
      meta: {
        layout: FormOnly,
      },
      component: SignUpView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: authenticated,
    },
    {
      path: '/add',
      name: 'add',
      component: AddView,
      beforeEnter: authenticated,
      meta: {
        layout: FormOnly,
      }
    },
  ],
})

export default router
