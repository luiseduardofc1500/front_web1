<script setup lang="ts">
import TextInput from "@/components/forms/TextInput.vue";
import FormField from "@/components/forms/FormField.vue";
import TextButton from "@/components/TextButton.vue";
import TextLink from "@/components/TextLink.vue";
</script>

<template>
  <div>
    <main class="w-64">
      <form>
        <div class="space-y-3">
          <FormField label="Nome">
            <TextInput
              type="text"
              placeholder="Insira seu nome"
              name="name"
              autocomplete="name"
              required
            />
          </FormField>

          <FormField label="E-mail">
            <TextInput
              type="email"
              placeholder="Insira seu endereço de e-mail"
              name="email"
              autocomplete="email"
              required
            />
          </FormField>

          <FormField label="Senha">
            <TextInput
              type="password"
              placeholder="Insira sua senha"
              name="password"
              required
            />
          </FormField>
        </div>

        <div class="mt-5">
          <TextButton type="submit">
            Cadastrar
          </TextButton>
        </div>
      </form>

      <hr class="my-5 block">

      <div class="text-center">
        <TextLink
          href="/sign-in"
        >
          Já tem conta?
        </TextLink>
      </div>
    </main>
  </div>
</template>
