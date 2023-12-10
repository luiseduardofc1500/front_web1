<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  error: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['removeToastById']);

const colorClasses = computed(() => {
  return {
    'bg-sky-500 shadow-sky-400/25 hover:shadow-sky-400/50 focus:shadow-sky-400/50': !props.error,
    'bg-red-500 shadow-red-400/25 hover:shadow-red-400/50 focus:shadow-red-400/50': props.error,
  };
});
</script>

<template>
  <div
    class="
      w-64
      rounded-lg shadow-lg p-3 flex items-center text-white text-sm
      transition duration-200 ease-in-out
      shadow-sm hover:shadow-lg focus:shadow-lg
      transform hover:-translate-y-0.5 focus:-translate-y-0.5 active:translate-y-0
    "
    :class="[colorClasses]"
  >
    <div
      class="flex-1"
      v-text="message"
    />
    <div class="ml-4 flex items-center justify-center">
      <button
          @click="$emit('removeToastById', id)"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
