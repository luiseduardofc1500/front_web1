<template>
  <div ref="viewWrapper" class="transition-all duration 200">
    <transition :name="transition" mode="out-in" @enter="updateWrapperSize">
      <slot/>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";

defineProps({
  transition: String,
});

const viewWrapper = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!viewWrapper.value) return;

  viewWrapper.value.style.height = `${viewWrapper.value.scrollHeight}px`;
});

function updateWrapperSize() {
  if (!viewWrapper.value) return;

  const view = viewWrapper.value.firstElementChild as HTMLElement;
  if (!view) return;

  viewWrapper.value.style.height = `${view.scrollHeight}px`;
}
</script>
