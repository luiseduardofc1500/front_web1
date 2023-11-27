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
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {RouterLink} from "vue-router";

const props = defineProps({
  isRound: Boolean,
  isLink: Boolean,
  isOutline: Boolean,
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
    return "bg-transparent hover:bg-sky-100 focus:bg-sky-100 text-sky-500 border border-sky-500";
  }

  return "bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 text-white";
});

const element = computed(() => {
  if (props.isLink) {
    return RouterLink;
  }

  return "button";
});
</script>
