<script setup lang="ts">
defineProps({
  label: String,
});
</script>

<template>
  <label class="space-y-0.5 block">
    <span class="block text-sm font-medium leading-6 text-gray-600 cursor-pointer">
      {{ label }}
    </span>

    <slot />
  </label>
</template>
