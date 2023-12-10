<template>
  <div>
    <main class="w-64">
      <form @submit.prevent="add">
        <div class="space-y-3">
          <FormField label="Nome">
            <TextInput
              type="text"
              placeholder="Insira o nome do medicamento"
              name="name"
              v-model="name"
              required
            />
          </FormField>

          <FormField label="Início do Tratamento">
            <TextInput
              type="datetime-local"
              placeholder="Insira a data de início do tratamento"
              name="startedAt"
              v-model="startedAt"
              required
            />
          </FormField>

          <FormField label="Periodicidade">
            <TextInput
              type="number"
              placeholder="Insira a periodicidade"
              min="1"
              name="periodicity"
              step="1"
              v-model="periodicity"
              required
            />

            <HelpText>
              Intervalo, em horas, entre as doses.
            </HelpText>
          </FormField>

          <FormField label="Comprimidos">
            <TextInput
              type="number"
              placeholder="Insira a quantidade de comprimidos"
              min="1"
              name="units"
              step="1"
              v-model="units"
              required
            />

            <HelpText>
              Quantidade receitada de comprimidos.
            </HelpText>
          </FormField>
        </div>

        <div class="mt-5">
          <TextButton
              type="submit"
              :loading="loading"
          >
            Cadastrar
          </TextButton>
        </div>
      </form>
    </main>
  </div>
</template>
<script setup lang="ts">
import TextButton from "@/components/TextButton.vue";
import FormField from "@/components/forms/FormField.vue";
import TextInput from "@/components/forms/TextInput.vue";
import HelpText from "@/components/forms/HelpText.vue";
import router from "@/router";
import {inject, ref} from "vue";
import type {MedicineRepository} from "@/lib/domain/repository/medicine";
import {useToastsStore} from "@/lib/infrastructure/repository/store/toasts";
import {Toast} from "@/lib/domain/entity/toast";
import {useMedicineStore} from "@/lib/infrastructure/repository/store/medicine";

const repository = inject<MedicineRepository>("MedicineRepository");

const medicineStore = useMedicineStore();
const toastsStore = useToastsStore();

const loading = ref(false);

const name = ref<string>();
const startedAt = ref<Date>();
const periodicity = ref<number>();
const units = ref<number>();

async function add() {
  if (!repository) return;

  if (!name.value || !startedAt.value || !periodicity.value || !units.value) {
    toastsStore.addToast(Toast.error("Preencha todos os campos"));
    return;
  }

  loading.value = true;

  const result = await repository.registerMedicine(
    name.value,
    periodicity.value,
    startedAt.value,
    units.value
  );

  if (!result) {
    toastsStore.addToast(Toast.error("Erro ao cadastrar medicamento"));
    loading.value = false;
    return;
  }

  toastsStore.addToast(Toast.success("Medicamento cadastrado com sucesso"));
  medicineStore.addMedicine(result);

  await router.push({name: "home"});
}
</script>