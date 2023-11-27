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
              required
            />

            <HelpText>
              Quantidade receitada de comprimidos.
            </HelpText>
          </FormField>
        </div>

        <div class="mt-5">
          <TextButton type="submit">
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

function add() {
  router.push({ name: "home" });
}
</script>