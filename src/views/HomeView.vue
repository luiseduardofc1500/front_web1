<template>
  <div class="flex items-center justify-center gap-5 lg:divide-x lg:divide-gray-200">
    <div class="w-96 hidden lg:block">
      <CalendarField />
    </div>

    <div class="lg:pl-5">
      <section class="mb-4">
        <small class="text-gray-500 block uppercase text-xs tracking-widest mb-1">
          Próximo remédio
        </small>

        <MedicineCard
            :is-next="true"
            :next-time="new Date()"
            name="Dorflex"
            :quantity="2"
            :interval="6"
            :duration="2"
        />
      </section>

      <ul class="space-y-2">
        <li>
          <MedicineCard
              name="Ritalina"
              :next-time="new Date()"
              :quantity="2"
              :interval="12"
              :duration="30"
          />
        </li>
        <li>
          <MedicineCard
              name="Rivotril"
              :next-time="new Date()"
              :quantity="1"
              :interval="6"
              :duration="1"
          />
        </li>
      </ul>

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
</script>