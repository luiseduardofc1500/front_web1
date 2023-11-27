<template>
  <div class="bg-white p-5 shadow-lg rounded-lg shadow-sky-500/25 overflow-hidden">
    <RouterView v-slot="{ Component: View }">
      <AnimatedSizeTransition transition="quick-slide">
        <component :is="View" />
      </AnimatedSizeTransition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import AnimatedSizeTransition from "@/components/AnimatedSizeTransition.vue";
</script>
