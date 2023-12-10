import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import type {AuthenticationRepository as AuthenticationRepositoryContract} from "@/lib/domain/repository/authentication";
import {AuthenticationRepository} from "@/lib/infrastructure/repository/http/authentication";
import type {MedicineRepository as MedicineRepositoryContract} from "@/lib/domain/repository/medicine";
import {MedicineRepository} from "@/lib/infrastructure/repository/http/medicine";

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)

app.provide<AuthenticationRepositoryContract>('AuthenticationRepository', new AuthenticationRepository(import.meta.env.VITE_APP_API_URL))
app.provide<MedicineRepositoryContract>('MedicineRepository', new MedicineRepository(import.meta.env.VITE_APP_API_URL))

app.mount('#app')
