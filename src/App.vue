<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Logo from "@/components/AppLogo.vue";
import AnimatedSizeTransition from "@/components/AnimatedSizeTransition.vue";

import {useToastsStore} from "@/lib/infrastructure/repository/store/toasts";
import ToastNotification from "@/components/ToastNotification.vue";

const toastsStore = useToastsStore();
</script>

<template>
  <div class="h-full w-full flex justify-center items-center bg-sky-50">
    <div>
      <div class="mb-3">
        <Logo/>
      </div>

      <AnimatedSizeTransition transition="quick-slide">
        <component :is="$route.meta.layout ?? 'div'" :key="$route.path">
          <RouterView/>
        </component>
      </AnimatedSizeTransition>

      <div class="fixed bottom-0 right-0 z-50 p-4">
        <div class="space-y-3 flex flex-col">
          <transition-group name="group-quick-slide">
            <ToastNotification
              v-for="toast in toastsStore.toasts"
              :key="toast.id"
              :id="toast.id"
              :message="toast.message"
              :error="toast.error"
              @remove-toast-by-id="toastsStore.removeToastById"
            />
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body,
html,
#app {
  @apply h-full w-full;
}
</style>
