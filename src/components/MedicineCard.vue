<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import AnimatedSizeTransition from './AnimatedSizeTransition.vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  interval: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  nextTime: {
    type: Date,
    required: true,
  },
  isNext: Boolean,
})

const isOpen = ref(false)

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}

onBeforeMount(() => {
  if (props.isNext) {
    isOpen.value = true
  }
})

const rootColorClasses = computed(() => {
  if (props.isNext) {
    return 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/25 hover:shadow-sky-500/50'
  }

  return 'bg-white hover:bg-gray-50 text-gray-900 shadow-md hover:shadow-lg'
})

const headerColorClasses = computed(() => {
  if (props.isNext) {
    return 'border-black/10'
  }

  return 'border-gray-200'
})

const userFriendlyTime = computed(() => {
  return props.nextTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
})

const utcTime = computed(() => {
  return props.nextTime.toISOString()
})

const userFriendlyQuantity = computed(() => {
  if (props.quantity === 1) {
    return '1 comprimido'
  }

  return `${props.quantity} comprimidos`
})

const userFriendlyInterval = computed(() => {
  if (props.interval === 1) {
    return '1 hora'
  }

  return `${props.interval} horas`
})

const userFriendlyDuration = computed(() => {
  if (props.duration === 1) {
    return '1 dia'
  }

  return `${props.duration} dias`
})
</script>

<template>
  <article
      class="block p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 cursor-pointer w-72 sm:w-96"
      :class="rootColorClasses"
      @click="toggleOpen"
  >
    <header
        class="mb-4 border-b pb-2 flex justify-between items-center"
        :class="headerColorClasses"
    >
      <h2 class="text-xl font-bold mb-2">
        {{ name }}
      </h2>

      <time class="text-xs bg-black/10 rounded-full px-2 py-1" :datetime="utcTime">
        {{ userFriendlyTime }}
      </time>
    </header>

    <AnimatedSizeTransition transition="quick-slide">
      <template v-if="isOpen">
        <dl class="text-sm">
          <div class="flex justify-between items-center mb-2">
            <dt class="text-xs">
              Quantidade
            </dt>

            <dd class="text-sm font-bold">
              {{ userFriendlyQuantity }}
            </dd>
          </div>

          <div class="flex justify-between items-center mb-2">
            <dt class="text-xs">
              Intervalo
            </dt>

            <dd class="text-sm font-bold">
              {{ userFriendlyInterval }}
            </dd>
          </div>

          <div class="flex justify-between items-center mb-2">
            <dt class="text-xs">
              Duração
            </dt>

            <dd class="text-sm font-bold">
              {{ userFriendlyDuration }}
            </dd>
          </div>
        </dl>
      </template>

      <template v-else>
        <p class="text-sm">
          Clique para ver mais detalhes
        </p>
      </template>
    </AnimatedSizeTransition>
  </article>
</template>
