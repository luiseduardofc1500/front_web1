<template>
  <div class="flex items-center justify-center gap-5 lg:divide-x lg:divide-gray-200">
    <div class="w-96 hidden lg:block">
      <CalendarField
          v-model="selectedDate"
          :highlighted-days="daysWithEntries"
      />
    </div>

    <div class="lg:pl-5 h-[28rem] flex justify-center flex-col relative">
      <AnimatedSizeTransition transition="quick-slide" class="mb-6">
        <section v-if="firstEntry">
          <small class="text-gray-500 block uppercase text-xs tracking-widest mb-1">
            Próximo remédio
          </small>

          <MedicineCard
              :is-next="true"
              :next-time="firstEntry.nextTime"
              :interval="firstEntry.interval"
              :duration="firstEntry.duration"
              :name="firstEntry.name"
          />
        </section>
        <div aria-hidden="true" v-else>
        </div>
      </AnimatedSizeTransition>

      <AnimatedSizeTransition transition="quick-slide" class="max-h-full overflow-hidden">
        <div
            v-if="listedEntries.length > 0"
            class="overflow-x-hidden relative -ml-2 w-full h-full"
        >
          <transition-group name="group-quick-slide" tag="ul" class="block space-y-2 overflow-y-scroll px-8 -mx-8 pt-2 -mt-2 h-full relative left-2 pb-6">
            <li class="block" v-for="entry in listedEntries" :key="entry.nextTime.getTime() + entry.name">
              <MedicineCard
                :next-time="entry.nextTime"
                :interval="entry.interval"
                :duration="entry.duration"
                :name="entry.name"
              />
            </li>
          </transition-group>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-full">
          <p class="text-gray-500 text-sm">
            Nenhum remédio cadastrado
          </p>
        </div>
      </AnimatedSizeTransition>

      <Teleport to="body">
        <div class="fixed bottom-6 right-6">
          <TextButton
              class="font-mono"
              :is-round="true"
              :is-link="true"
              to="add"
          >
            +
          </TextButton>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import MedicineCard from "@/components/MedicineCard.vue";
import TextButton from "@/components/TextButton.vue";
import CalendarField from "@/components/forms/CalendarField.vue";
import {useMedicineStore} from "@/lib/infrastructure/repository/store/medicine";
import {computed, inject, onBeforeMount, onMounted, ref} from "vue";
import type {Medicine} from "@/lib/domain/entity/medicine";
import type {MedicineRepository} from "@/lib/domain/repository/medicine";
import AnimatedSizeTransition from '@/components/AnimatedSizeTransition.vue'

const repository = inject<MedicineRepository>('MedicineRepository')!;

const medicineStore = useMedicineStore();

const selectedDate = ref<Date>(new Date);

type MedicineEntry = {
  name: string;
  interval: number;
  duration: number;
  nextTime: Date;
  isNext: boolean;
};

function generateMedicineEntries(medicine: Medicine): MedicineEntry[] {
  const entries = [];
  const {periodicity, units} = medicine;
  const duration = periodicity * units;

  for (let i = 0; i < units; i++) {
    const nextTime = new Date(medicine.startedAt.getTime() + periodicity * i * 60 * 60 * 1000);

    entries.push({
      name: medicine.name,
      interval: periodicity,
      duration,
      nextTime,
      isNext: i === 0,
    });
  }

  return entries;
}

const medicineEntries = computed<MedicineEntry[]>(() => {
  return medicineStore.medicines.flatMap<MedicineEntry>(generateMedicineEntries)
});

const firstEntry = computed<MedicineEntry | undefined>(() => {
  if (selectedDate.value.toDateString() !== new Date().toDateString()) {
    return undefined;
  }

  return medicineEntries.value[0];
});

const listedEntries = computed<MedicineEntry[]>(() => {
  const listedEntries = medicineEntries.value
      .filter(entry => entry.nextTime.toDateString() === selectedDate.value.toDateString());

  if (firstEntry.value) {
    listedEntries.unshift(firstEntry.value);
  }

  return listedEntries;
});

const daysWithEntries = computed<Set<Date>>(() => {
  const days = new Set<Date>();

  for (const entry of medicineEntries.value) {
    days.add(new Date(entry.nextTime.getFullYear(), entry.nextTime.getMonth(), entry.nextTime.getDate()));
  }

  return days;
});

onBeforeMount(async () => {
  const medicines = await repository.listMedicines();

  if (medicines) {
    medicineStore.setMedicines(medicines);
  }
});
</script>