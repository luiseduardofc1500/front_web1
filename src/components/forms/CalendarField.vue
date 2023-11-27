<template>
  <div>
    <header class="flex items-center justify-between">
        <TextButton
            @click="changeMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1))"
            :is-round="true"
            :is-outline="true"
            class="font-mono"
        >
          &lt;
        </TextButton>

        <AnimatedSizeTransition
          :transition="calendarTransition"
        >
          <h2
            :key="selectedMonth.getTime()"
            class="text-sm font-semibold text-gray-900 uppercase tracking-widest"
          >
              {{ userFriendlySelectedMonth }}
          </h2>
        </AnimatedSizeTransition>

        <TextButton
            @click="changeMonth(new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 1))"
            :is-round="true"
            :is-outline="true"
            class="font-mono"
        >
          &gt;
        </TextButton>
    </header>

    <div class="mt-6">
      <div class="grid grid-cols-7 text-center text-xs leading-6 text-gray-500 h-8 items-center">
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
        <div>S</div>
      </div>

      <AnimatedSizeTransition
          :transition="calendarTransition"
      >
        <div
            class="mt-2 grid grid-cols-7 text-sm"
            :key="selectedMonth.getTime()"
        >
          <div
              v-for="(day, dayIdx) in days"
              :key="day.utcTime"
              class="py-2"
              :class="dayIdx > 6 && 'border-t border-gray-200'"
          >
            <button
                @click="changeDate(day.date)"
                type="button"
                class="mx-auto flex h-8 w-8 items-center justify-center rounded-full transition duration-200"
                :class="[
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isToday && 'text-sky-500',
                    !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
                    !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
                    day.isSelected && 'bg-sky-500',
                    !day.isSelected && 'hover:bg-gray-200',
                    (day.isSelected || day.isToday) && 'font-semibold',
                ]"
            >
              <time :datetime="day.utcTime">
                {{ day.userFriendlyNumber }}
              </time>
            </button>
          </div>
        </div>
      </AnimatedSizeTransition>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import TextButton from "@/components/TextButton.vue";
import AnimatedSizeTransition from "../AnimatedSizeTransition.vue";

const calendarTransition = ref('left-slide')
const selectedMonth = ref(new Date())
const selectedDate = ref(new Date())

const userFriendlySelectedMonth = computed(() => {
  return selectedMonth.value.toLocaleDateString([], {
    month: 'long',
    year: 'numeric',
  })
})

function changeDate(newDate: Date) {
  if (newDate.getMonth() !== selectedMonth.value.getMonth()) {
    changeMonth(newDate)
  }

  selectedDate.value = newDate
}

function changeMonth(newMonth: Date) {
  if (newMonth > selectedMonth.value) {
    calendarTransition.value = 'right-slide'
  } else {
    calendarTransition.value = 'left-slide'
  }

  selectedMonth.value = newMonth
}

type Day = {
  date: Date,
  userFriendlyNumber: string,
  utcTime: string,
  isToday: boolean,
  isCurrentMonth: boolean,
  isSelected: boolean,
}

const days = computed(() => {
  const daysInMonth = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth() + 1, 0).getDate()
  const firstDayInMonth = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth(), 1).getDay()
  const lastDayInMonth = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth() + 1, 0).getDay()

  const days = [] as Day[]

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth(), i)

    days.push({
      date: dayDate,
      userFriendlyNumber: dayDate.getDate().toString().padStart(2, '0'),
      utcTime: dayDate.toUTCString(),
      isToday: dayDate.toDateString() === new Date().toDateString(),
      isCurrentMonth: true,
      isSelected: dayDate.toDateString() === selectedDate.value.toDateString(),
    })
  }

  for (let i = 0; i < firstDayInMonth; i++) {
    const dayDate = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth(), 0 - i)

    days.unshift({
      date: dayDate,
      userFriendlyNumber: dayDate.getDate().toString().padStart(2, '0'),
      utcTime: dayDate.toUTCString(),
      isToday: false,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  for (let i = 1; i < 7 - lastDayInMonth; i++) {
    const dayDate = new Date(selectedMonth.value.getFullYear(), selectedMonth.value.getMonth() + 1, i)

    days.push({
      date: dayDate,
      userFriendlyNumber: dayDate.getDate().toString().padStart(2, '0'),
      utcTime: dayDate.toUTCString(),
      isToday: false,
      isCurrentMonth: false,
      isSelected: false,
    })
  }

  return days
})
</script>