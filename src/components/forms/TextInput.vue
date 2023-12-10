<script setup lang="ts">
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    class="w-full px-2.5 border border-gray-300 block rounded-md py-2 shadow-sm ring-1 ring-inset ring-white/10 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 focus:ring-opacity-50 shadow-sky-400/25 focus:shadow-lg focus:shadow-sky-400/50 placeholder-gray-400/75 font-normal transition duration-200 ease-in-out text-sm"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value ?? '')"
  />
</template>