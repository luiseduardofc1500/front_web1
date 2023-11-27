<script setup lang="ts">
defineProps<{
  href: string;
}>();
</script>

<template>
  <RouterLink
    class="block text-sm text-sky-500 hover:text-sky-600 focus:text-sky-600 transition duration-200 ease-in-out transform hover:-translate-y-0.5 focus:-translate-y-0.5 active:translate-y-0 outline-none focus:outline-none"
    :to="href"
  >
    <slot />
  </RouterLink>
</template>
