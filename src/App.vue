<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import Logo from "@/components/AppLogo.vue";
import AnimatedSizeTransition from "@/components/AnimatedSizeTransition.vue";
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
