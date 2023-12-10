<template>
  <component
    :is="element"
    class="
      block
      text-center
      font-medium text-sm
      transition duration-200 ease-in-out
      shadow-sm shadow-sky-400/25 hover:shadow-sky-400/50 hover:shadow-lg focus:shadow-lg focus:shadow-sky-400/50
      outline-none
      transform hover:-translate-y-1 focus:-translate-y-1 active:translate-y-0
    "
    :class="[
      spacingClasses,
      shapeClasses,
      sizeClasses,
      colorClasses,
    ]"
    :disabled="isDisabled"
  >
    <div class="flex justify-center items-center relative">
      <div
        class="transition-opacity duration-200 ease-in-out"
        :class="{
          'opacity-0': loading,
          'opacity-100': !loading,
        }"
      >
        <slot/>
      </div>

      <div
        class="absolute inset-0 flex justify-center items-center transition-opacity duration-200 ease-in-out"
        :class="{
          'opacity-0': !loading,
          'opacity-100': loading,
        }"
      >
        <svg
          v-if="loading"
          class="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps({
  isRound: Boolean,
  isLink: Boolean,
  isOutline: Boolean,
  disabled: Boolean,
  loading: Boolean,
});

const spacingClasses = computed(() => {
  if (props.isRound) {
    return "p-2.5";
  }

  return "py-2.5 px-4";
});

const shapeClasses = computed(() => {
  if (props.isRound) {
    return "rounded-full";
  }

  return "rounded-md";
});

const sizeClasses = computed(() => {
  if (props.isRound) {
    return "w-10 h-10";
  }

  return "w-full";
});

const colorClasses = computed(() => {
  if (props.isOutline) {
    return "bg-transparent hover:bg-sky-100 focus:bg-sky-100 text-sky-500 border border-sky-500 disabled:bg-transparent disabled:text-sky-400 disabled:border-sky-400";
  }

  return "bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 text-white disabled:bg-sky-400 disabled:text-white";
});

const element = computed(() => {
  if (props.isLink) {
    return RouterLink;
  }

  return "button";
});

const isDisabled = computed(() => {
  return props.disabled || props.loading;
});
</script>
